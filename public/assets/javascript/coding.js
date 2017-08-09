// create ace text editor
var editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight");
editor.session.setMode("ace/mode/javascript");

// inital ui
$("#top-navbar").hide(0).show(1000);
$("#main-container").fadeOut(0).fadeIn(1000);
$("#runcode").fadeOut(0);
$(".code-area").fadeOut(0);
$("#info-during-coding").fadeOut(0);
$("#username").fadeOut(0);
$("#refresh").fadeOut(0);

// force refresh when user is in coding state
$("#refresh").click(function() {
	window.location.reload();
})

// code array
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

// choose a problem
$("#problem-0").click(function() {
	// disable default behavior of buttons
	event.preventDefault();
	problemId = 0;
	renderProblem(problemId);
	$("#runcode").fadeOut(0);
	$(".code-area").fadeOut(0);
	$("#starttimer").fadeIn(1000);
	stopwatch.stop();
});
$("#problem-1").click(function() {
	// disable default behavior of buttons
	event.preventDefault();
	problemId = 1;
	renderProblem(problemId);
	$("#runcode").fadeOut(0);
	$(".code-area").fadeOut(0);
	$("#starttimer").fadeIn(1000);
	stopwatch.stop();
});

renderProblem(problemId);

// start coding
var username;
$("#starttimer").click(function() {
	$("#runcode").fadeIn(1000);
	$(".code-area").fadeIn(1000);
	$("#username").fadeIn(1000);
	$("#starttimer").fadeOut(0);
	$("#refresh").fadeIn(1000);
	$("#info-during-coding").fadeIn(1000);
	stopwatch.start();
});

function renderProblem(problemId) {
	// generate the problem with the random number
	$("#problem-description").html("Problem #<strong>" + problemId + "</strong>: " + problemArray[problemId].problemDescription);
    
	// Mel: Sets the editor value
    editor.setValue(problemArray[problemId].functionHeader);

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

	$("#info-during-coding").fadeOut(0);
	$("#pass").fadeOut(0);
	$("#fail").fadeOut(0);
	$("#error").fadeOut(0);

	//Mel: Grabs the value from editor
	var userCode = editor.getValue();
	console.log("User code: " + userCode);

	$.post(
		"/api/run_code", {userCode: userCode, problemId: problemId}).done(function(data) {
		console.log("Backend returns " + data.result);
		if (data.result.indexOf("Congratulations") >= 0) {
			username = $("#username").val().trim();
			console.log("[DEBUG] username = " + username);
			if (username == "Name") {
				alert("Please enter a username");
			}
			else {
				var resultMessage = data.result 
				+ "You solved the problem within " 
				+ stopwatch.time 
				+ " seconds.";
				
				// only stop timer when user code is correct
				stopwatch.stop();

				$("#pass").text(resultMessage);
				$("#pass").show(1000);

				$("#runcode").fadeOut(0);
				$("#username").fadeOut(0);
				$("#refresh").fadeOut(0);
			}
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
