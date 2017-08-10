// create ace text editor
var editor = ace.edit("editor");
editor.setTheme("ace/theme/vibrant_ink");
editor.session.setMode("ace/mode/javascript");
editor.setFontSize(17);

// inital ui
$("#top-navbar").hide(0).show(1000);
$("#main-container").fadeOut(0).fadeIn(1000);
$("#runcode").fadeOut(0);
$(".code-area").fadeOut(0);
$("#info-during-coding").fadeOut(0);
$("#username").fadeOut(0);
$("#refresh").fadeOut(0);
$("#clock-title").fadeOut(0);
$("#clock").fadeOut(0);

// force refresh when user is in coding state
$("#refresh").click(function() {
	window.location.reload();
})

// code array
var problemArray = [
{
	problemTitle: "Find Largest Number in An Array",
	problemDescription: "Write a function that finds the largest number in an array.",
	problemExample: "If array [1, 2, 3] is passed to your function, it should return 3.",
	functionHeader: "// write your code here\r\nfunction findMax(array) {\r\n}"
},
{
	problemTitle: "Reverse A String",
	problemDescription: "Write a function that reverses a string.",
	problemExample: "If string \"abc\" is passed to your function, it should return string \"cba\".",
	functionHeader: "// write your code here\r\nfunction reverse(str) {\r\n}"
}
];

function updateRank(problemId) {
	$.get("/api/get_rank/" + problemId, function(data) {
		$("#top-3").empty();
		console.log("Trying to get rank for question #" + problemId);
		console.log(data);
		for (var i = 0; i < data.length; i++) {
			switch(problemId) {
				case 0: {
					if (parseInt(data[i].problem_0_time) < 1800) {
						$("#top-3").append(
							"<li><img src=\"assets/images/star-icon.png\" width=\"20px\">" 
							+ data[i].name 
							+ " (" + data[i].problem_0_time + " seconds)"
							+ "</li>"
							);
					}
					break;
				}
				case 1: {
					if (parseInt(data[i].problem_1_time) < 1800) {
						$("#top-3").append(
							"<li><img src=\"assets/images/star-icon.png\" width=\"20px\">" 
							+ data[i].name 
							+ " (" + data[i].problem_1_time + " seconds)"
							+ "</li>"
							);
					}
					break;
				}
				default: {
					console.log("This should not be executed.");
				}
			}
			
		}
	});
}

// initial problem ID
var problemId = 0;

// initial ranking for problem 0
updateRank(0);

// choose a problem
$("#problem-0").click(function() {
	// disable default behavior of buttons
	event.preventDefault();
	problemId = 0;
	renderProblem(problemId);
	$("#runcode").fadeOut(0);
	$(".code-area").fadeOut(0);
	$("#starttimer").fadeIn(1000);
	$("#info-during-coding").fadeOut(0);
	$("#username").fadeOut(0);
	$("#refresh").fadeOut(0);
	$("#clock-title").fadeOut(0);
	$("#clock").fadeOut(0);
	stopwatch.stop();
	updateRank(0);
});
$("#problem-1").click(function() {
	// disable default behavior of buttons
	event.preventDefault();
	problemId = 1;
	renderProblem(problemId);
	$("#runcode").fadeOut(0);
	$(".code-area").fadeOut(0);
	$("#starttimer").fadeIn(1000);
	$("#info-during-coding").fadeOut(0);
	$("#username").fadeOut(0);
	$("#refresh").fadeOut(0);
	$("#clock-title").fadeOut(0);
	$("#clock").fadeOut(0);
	stopwatch.stop();
	updateRank(1);
});

renderProblem(problemId);

// start coding
var userName;
$("#starttimer").click(function() {
	$("#runcode").fadeIn(1000);
	$(".code-area").fadeIn(1000);
	$("#username").fadeIn(1000);
	$("#starttimer").fadeOut(0);
	$("#refresh").fadeIn(1000);
	$("#info-during-coding").fadeIn(1000);
	$("#clock-title").fadeIn(1000);
	$("#clock").fadeIn(1000);
	stopwatch.start();
});

function renderProblem(problemId) {
	// generate the problem with the random number
	$("#problem-title").html("<strong>Problem " + ": " + problemArray[problemId].problemTitle + "</strong>");
	$("#problem-description").html("<strong>Description</strong><br>" + problemArray[problemId].problemDescription);
	$("#problem-example").html("<strong>Example</strong><br>" + problemArray[problemId].problemExample);
    
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
			userName = $("#username").val().trim();
			console.log("[DEBUG] username = " + userName);
			if (userName == "") {
				alert("Please enter a username");
			}
			else {

				var userTime = stopwatch.time;

				var resultMessage = data.result 
				+ "You solved the problem within " 
				+ userTime 
				+ " seconds.";
				
				// only stop timer when user code is correct
				stopwatch.stop();

				$("#pass").text(resultMessage);
				$("#pass").show(1000);

				$("#runcode").fadeOut(0);
				$("#username").fadeOut(0);
				$("#refresh").fadeOut(0);
				$("#clock-title").fadeOut(0);
				$("#clock").fadeOut(0);

				// make another post to write user name/time into database
				$.post("/api/add_result_to_db", {name: userName, problemId: problemId, time: userTime}).done(function() {
					console.log("Finished writing user's name and time into database.");
					updateRank(problemId);
				});
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
}); // end runcode