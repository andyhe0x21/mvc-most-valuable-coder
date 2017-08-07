"use strict";
(function() {
	function testbench(code, problemId) {

		// import eval
		var codeGenerator = require("eval");

		console.log(code);
		console.log(problemId);

		// append "module.exports" to the code
		switch(problemId) {
			case 0: {
				code += "module.exports = findMax;"
				break;
			}
			case 1: {
				code += "module.exports = reverse;"
				break;
			}
			default: {
				console.log("Wrong problem ID.");
				break;
			}
		}

		var testVectors = [
		// problem 0: find maximum in an array
		[
		{array: [1, 3, 5], max: 5},
		{array: [9, 1, 0], max: 9},
		{array: [998, 123, 235], max: 998}
		],
		// problem 1: reverse a string
		[
		{str: "abc", reversedString: "cba"},
		{str: "aeiou", reversedString: "uoiea"}
		]];

		try {
			// pass knwon test vector to user's function
			var userfunction = codeGenerator(code);

			var mismatch = false;
			
			// run all test cases
			switch (problemId) {
				case 0: {
					for (var i = 0; i < testVectors[problemId].length; i++) {
						if (userfunction(testVectors[problemId][i].array) != testVectors[problemId][i].max) {
							// prepare failure message
							var failMessage = "Fail: "
							+ "Maximum number of array " 
							+ testVectors[problemId][i].array 
							+ " is "
							+ testVectors[problemId][i].max
							+ ". However, the maximum number given by your function is "
							+ userfunction(testVectors[problemId][i].array) 
							+ ".";
							console.log(failMessage);
							mismatch = true;
							break;
						}
					}
					break; // not needed actually
				}
				case 1: {
					for (var i = 0; i < testVectors[problemId].length; i++) {
						if (userfunction(testVectors[problemId][i].str) != testVectors[problemId][i].reversedString) {
							// prepare failure message
							var failMessage = "Fail: "
							+ "The reversed string of "
							+ testVectors[problemId][i].str
							+ " is \""
							+ testVectors[problemId][i].reversedString
							+ "\". However, the string given by your function is \""
							+ userfunction(testVectors[problemId][i].str) 
							+ "\".";
							console.log(failMessage);
							mismatch = true;
							break;
						}
					}
					break; // not needed actually
				}
				default: {
					console.log("Wrong problem ID.");
					break;
				}
			}
			if (mismatch) {
				return failMessage;
			}
			else {
				return "Congratualations! You code has been accepted.";
			}
		}
		catch(error) {
			return "Compiling Failed: " + error;
		}
	}
	module.exports = testbench;
})();