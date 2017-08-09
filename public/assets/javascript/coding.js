// inital fade-in
$("#top-navbar").hide(0).show(1000);
$("#main-container").fadeOut(0).fadeIn(1000);

// start timer
$("#starttimer").click(function() {
	stopwatch.start();
});

// variable that will hold our setInterval that runs the stopwatch
var intervalId;
var intervalSet = false;

// stopwatch object
var stopwatch = {
  time: 0,
  reset: function() {
    time = 0;
    intervalSet = false;

    // reset timer
    $("#clock").html("00:00");
  },
  start: function() {
    if (!intervalSet) {
      // set interval 1 second
      intervalId = setInterval(stopwatch.count, 1000);
      intervalSet = true;
    }
  },
  stop: function() {
    // clear interval, stop timer
    clearInterval(intervalId);
    // reset the timer
    stopwatch.reset();
  },
  count: function() {
    // increment timer value by 1, remember we cannot use "this" here
    stopwatch.time++;
    // convert timer value and save it to 
    var convertedTime = stopwatch.timeConverter(stopwatch.time);
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

// code verifier
var problemId = 0;
var problemArray = [
{
	problemDescription: "Write a function that finds the largest number in an array.",
	functionHeader: "function findMax(array) {\r\n// write your code here\r\n}"
},
{
	problemDescription: "Write a function that reverses a string.",
	functionHeader: "function reverse(str) {\r\n// write your code here\r\n}"
}
];

$("#problem-0").click(function() {
	// disable default behavior of buttons
	event.preventDefault();
	problemId = 0;
	renderProblem(problemId);
});

$("#problem-1").click(function() {
	// disable default behavior of buttons
	event.preventDefault();
	problemId = 1;
	renderProblem(problemId);
});

renderProblem(problemId);

function renderProblem(problemId) {
	// generate the problem with the random number
	$("#problem-description").html("Problem #<strong>" + problemId + "</strong>: " + problemArray[problemId].problemDescription);

	$("#usercode").val(problemArray[problemId].functionHeader);

	$("#problem-description").hide(0).show(1000);

	// hide test result
	$("#pass").hide(0);
	$("#fail").hide(0);
	$("#error").hide(0);
}

$("#runcode").click(function() {

	// disable default behavior of buttons
	event.preventDefault();

	// stop the timer
	console.log("[DEBUG: The user spent " + stopwatch.time + " second(s).");

	$("#default-console").hide(200);
	$("#pass").hide(200);
	$("#fail").hide(200);
	$("#error").hide(200);

	var userCode = $("#usercode").val();
	console.log("User code: " + userCode);

	$.post(
		"/api/run_code", {userCode: userCode, problemId: problemId}).done(function(data) {
		console.log("Backend returns " + data.result);
		if (data.result.indexOf("Congratualations") >= 0) {
			$("#pass").text(data.result);
			$("#pass").show(1000);
			// only stop timer when user code is correct
			stopwatch.stop();
		}
		else if (data.result.indexOf("Fail") >= 0) {
			$("#fail").text(data.result);
			$("#fail").show(1000);
		}
		else if (data.result.indexOf("Compiling") >= 0) {
			$("#error").text(data.result);
			$("#error").show(1000);
		}
		else {
			console.log("unexpected returned value!!");
		}
	});
});