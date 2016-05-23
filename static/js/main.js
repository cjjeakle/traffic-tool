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
    var currentSpeed = positionData.speed | 0;
    var now = new Date().getTime() / 1000;
    var reading = {
        speed: currentSpeed,
        time: now
    };

    speedSum1Min += currentSpeed;
    readings1Min.push(reading);

    speedSum5Min += currentSpeed;
    readings5Min.push(reading);

    // Remove readings older than 1 min
    while((now - readings1Min[0].time) > 60) {
        var removedReading = readings1Min.shift();
        speedSum1Min -= removedReading.speed;
    };

    // Remove readings older than 5 min
    while((now - readings5Min[0].time) > (60 * 5)) {
        var removedReading = readings5Min.shift();
        speedSum5Min -= removedReading.speed;
    };

    updateUI(currentSpeed);
}

function updateUI(currentSpeed) {
    var averageSpeed = getCurrentAverage();
    $('#averageSpeed').text(formatSpeed(averageSpeed));
    $('#currentSpeed').text(formatSpeed(currentSpeed));
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

function formatSpeed(speedMetersPerSec) {
    if (speedUnits == mph) {
        return speedMetersPerSec * 2.237; // approximate
    } else if (speedUnits == kmh) {
        return speedMetersPerSec * 3.6;
    } else {
        throw speedUnitsInvalid;
    }
}

///Watch for position data updates
navigator.geolocation.watchPosition(updateAverage);
