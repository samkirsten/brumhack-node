/**
 * Created by SamuelKirsten on 12/03/2016.
 */
// Position Variables
var x = 0;
var y = 0;
var z = 0;

// Acceleration
var ax = 0;
var ay = 0;
var az = 0;

var delay = 100;


if (window.DeviceMotionEvent==undefined) {
    document.getElementById("no").style.display="block";
    document.getElementById("yes").style.display="none";
}
else {
    window.ondevicemotion = function(event) {
        ax = Math.round(Math.abs(event.accelerationIncludingGravity.x * 1));
        ay = Math.round(Math.abs(event.accelerationIncludingGravity.y * 1));
        az = Math.round(Math.abs(event.accelerationIncludingGravity.z * 1));
    }

    setInterval(function() {
        document.getElementById("xlabel").innerHTML = "X: " + ax;
        document.getElementById("ylabel").innerHTML = "Y: " + ay;
        document.getElementById("zlabel").innerHTML = "Z: " + az;
    }, delay);
}