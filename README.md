# traffic-tool
A tool to determine your average speed in stop-and-go traffic over certain time windows. You can use this information to travel near your average speed, ideally resulting in a smoother, less frustrating drive.

Visit [this project's page](http://cjjeakle.github.io/traffic-tool) from your smartphone to try it out!

## Findings:
Unfortunately, it looks like this project did not work as well as I had hoped. In heavy stop-and-go traffic it's possible the idea would work, but in more typical traffic with sporadic slowdowns your average speed changes too drastically across time intervals, and even between lanes. As a result, it doesn't make sense to simply target your past average speed to avoid slowing down. 

I've found using a generous follow distance to the car in front of you is far more practical in traffic jams, as you can simply coast to a lower speed before needing to hit the brakes.

Other known limitations:
* There is no universal HTML API to prevent smartphone screens from locking (which suspends JS execution)
 * As a consequence, users must periodically tap the screen to keep the phone awake
 * I find this is too much of a distraction to feel comfortable with people using this app while driving
   * More generally, I find only passive sources of information are useful while driving, such as a GPS screen or speedometer
* This app's speed calculations are quite accurate on open roads, but there is a fair amount of noise at low speeds where the app would be most useful
  * This is even true with the geolocation API's enableHighAccuracy flag set
* This page will require HTTPS to work in Google Chrome
  * Chrome has disabled the geolocation API on origins served over HTTP, and other browsers are likely to follow
  * Because I'm hosting on GitHub pages, and I've provided a custom CNAME alias for my cjjeakle.github.io domain, it's impractical to provide HTTPS connectivity for this site

In light of these findings, I've deprecated this project. I'll leave it up, however, to act as a quick reference for any future HTML geolocation API projects.

## The Premise:
I designed this tool after reading through [a site](http://trafficwaves.org/) likening traffic slow-downs to compression in a longitudinal wave. The comparison made incredible sense. Based on this, one can travel at or below their average speed across a window of traffic and smooth out the more compressed sections. This allows you to travel at a constant rate, avoiding temporary pockets of low speed.

Beyond that site, this [Reddit thread](https://www.reddit.com/r/askscience/comments/1lqdzo/traffic_engineers_what_causes_the_pulsatile_flow/) features some intuitive, in-depth videos and explanations.

This tool calculates a moving average of your speed, which gives you a ballpark target speed to maintain. By traveling at or below the average of your stopping and going, you can defer or even avoid slowing down in traffic. This can make for a smoother ride, less wear on your car, and perhaps even a less frustrating day.

Of course, this tool is an experiment. It's entirely possible knowing your current average speed over some window in time will have no bearing on your average speed during upcoming stretches of time. As always with free software and experiments of this sort, caveat emptor.

## License:
### Third party code:
`/static/js/main.js` contains an implementation of the Haversine formula from Stack Overflow.
This code is denoted and attributed in the file's comments, and is used under Stack Overflow's Creative Commons BY-SA 3.0 license.

The license text is available at: https://creativecommons.org/licenses/by-sa/3.0/

The Stack Overflow post:
* https://stackoverflow.com/questions/13840516

The authors of the used snippet:
* Frank van Puffelen, https://stackoverflow.com/users/209103/frank-van-puffelen
* onemanarmy, https://stackoverflow.com/users/805003/onemanarmy

### License for all other code:
The MIT License (MIT)

Copyright (c) 2016 Chris Jeakle

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

