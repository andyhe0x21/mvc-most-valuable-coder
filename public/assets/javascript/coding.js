// inital fade-in
$("#top-navbar").hide(0).show(1000);
$("#main-container").fadeOut(0).fadeIn(1000);

var problemId = 0;

var problemArray = [
{
	problemDescription: "Write a function that finds the maximum number in an array.",
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
    
	//Mel: Sets the editor value
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

	$("#default-console").hide(200);
	$("#pass").hide(200);
	$("#fail").hide(200);
	$("#error").hide(200);

	//Mel: Grabs the value from editor
	var userCode = editor.getValue();
	console.log("User code: " + userCode);

	$.post(
		"/api/run_code", {userCode: userCode, problemId: problemId}).done(function(data) {
		console.log("Backend returns " + data.result);
		if (data.result.indexOf("Congratulations") >= 0) {
			$("#pass").text(data.result);
			$("#pass").show(1000);
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
