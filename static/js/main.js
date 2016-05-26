///Useful Constants
var mph = 'mph';
var kmh = 'kmh';
var speedUnitsInvalid = 'Invalid speed units';
var windowInvalid = 'Invalid data analysis window';

///Global State
var windowSizeInMinutes = 1;
var speedUnits = mph;

var speedSum1Min = 0;
var speedSum5Min = 0;
var readings1Min = [];
var readings5Min = [];

///UI Functions
function swapTimeInterval() {
    if(windowSizeInMinutes == 1) {
        windowSizeInMinutes = 5;
    } else if (windowSizeInMinutes == 5) {
        windowSizeInMinutes = 1;
    } else {
        throw windowInvalid;
    }

    var class1min = $('#1min').attr('class');
    var class5min = $('#5min').attr('class');
    $('#1min').attr('class', class5min);
    $('#5min').attr('class', class1min);
}

function swapSpeedUnits() {
    if (speedUnits == mph) {
        speedUnits = kmh;
    } else if (speedUnits == kmh) {
        speedUnits = mph;
    } else {
        throw speedUnitsInvalid;
    }

    var mphClass = $('#mph').attr('class');
    var kmhClass = $('#kmh').attr('class');
    $('#mph').attr('class', kmhClass);
    $('#kmh').attr('class', mphClass);
}

///Program Logic
function updateAverage(positionData) {
    var curTime = new Date().getTime() / 1000;
    var curLat = positionData.coords.latitude;
    var curLon = positionData.coords.longitude;

    var prevTime;
    var prevLat;
    var prevLon;
    if (readings1Min.length) {
        prevTime = readings1Min[readings1Min.length - 1].time;
        prevLat = readings1Min[readings1Min.length - 1].lat;
        prevLon = readings1Min[readings1Min.length - 1].lon;
    } else {
        prevTime = curTime - 1;
        prevLat = curLat;
        prevLon = curLon;
    }
    var distanceKM = distance(curLon, curLat, prevLon, prevLat);
    
    var speedKMH = (distanceKM / ((curTime - prevTime) / 60 / 60));
    var reading = {
        speedKMH: speedKMH,
        lat: positionData.coords.latitude,
        lon: positionData.coords.longitude,
        time: curTime
    };

    speedSum1Min += speedKMH;
    readings1Min.push(reading);

    speedSum5Min += speedKMH;
    readings5Min.push(reading);

    // Remove readings older than 1 min
    while((curTime - readings1Min[0].time) > 60) {
        var removedReading = readings1Min.shift();
        speedSum1Min -= removedReading.speedKMH;
    };

    // Remove readings older than 5 min
    while((curTime - readings5Min[0].time) > (60 * 5)) {
        var removedReading = readings5Min.shift();
        speedSum5Min -= removedReading.speedKMH;
    };

    updateUI(speedKMH);
}

/*
Begin snippet from Stack Overflow
https://stackoverflow.com/questions/13840516
-
Authors
Frank van Puffelen, https://stackoverflow.com/users/209103/frank-van-puffelen
onemanarmy, https://stackoverflow.com/users/805003/onemanarmy
-
cc by-sa 3.0 license, https://creativecommons.org/licenses/by-sa/3.0/
*/
function distance(lon1, lat1, lon2, lat2) {
  var R = 6371; // Radius of the earth in km
  var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
  var dLon = (lon2-lon1).toRad(); 
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
          Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}
if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}
/*
End snippet from Stack Overflow
*/

function updateUI(currentSpeedKMH) {
    var averageSpeedKMH = getCurrentAverage();
    $('#averageSpeed').text(formatSpeed(averageSpeedKMH));
    $('#currentSpeed').text(formatSpeed(currentSpeedKMH));
}

function getCurrentAverage() {
    if(windowSizeInMinutes == 1) {
        return speedSum1Min / readings1Min.length;
    } else if (windowSizeInMinutes == 5) {
        return speedSum5Min / readings5Min.length;
    } else {
        throw windowInvalid;
    }
}

function formatSpeed(speedKMH) {
    if (speedUnits == mph) {
        return speedKMH * 0.621; // approximate
    } else if (speedUnits == kmh) {
        return speedKMH
    } else {
        throw speedUnitsInvalid;
    }
}

function geolocationError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert('Permission denied, cannot determine your speed.'
                + '\n\n'
                + 'If you\'re using Chrome, this can automatically happen because geolocation is only allowed over HTTPS.');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Position unavailable, cannot determine your speed');
            break;
        case error.TIMEOUT:
            alert('Application timeout while determining your speed.')
            break;
        default:
            alert('An error occurred while determining your speed.');
            break;
    }
}

///Watch for position data updates
navigator.geolocation.watchPosition(updateAverage, geolocationError, {maximumAge: 5000, timeout:10000, enableHighAccuracy: true});
