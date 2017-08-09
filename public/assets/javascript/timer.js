// stopwatch object
var stopwatch = {
  time: 0,
  intervalId: null,
  intervalSet: false,

  reset: function() {
    stopwatch.time = 0;
    stopwatch.intervalSet = false;
    $("#clock").html("00:00");
  },
  start: function() {
    if (!stopwatch.intervalSet) {
      stopwatch.intervalId = setInterval(stopwatch.count, 1000); // set interval 1 second
      stopwatch.intervalSet = true;
    }
  },
  stop: function() {
    clearInterval(stopwatch.intervalId); // clear interval, stop timer
    stopwatch.reset(); // reset the timer
    stopwatch.intervalSet = false;
  },
  count: function() {
    stopwatch.time++; // increment timer value by 1, remember we cannot use "this" here
    var convertedTime = stopwatch.timeConverter(stopwatch.time); // convert timer value and save it to 
    console.log(convertedTime);
    // DONE: Use the variable we just created to show the convertedTime time in the "display" div.
    $("#clock").html(convertedTime);
  },
  timeConverter: function(t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
  }
};