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
				code += "module.exports = add;"
				break;
			}
			case 1: {
				code += "module.exports = findMax;"
				break;
			}
			case 2: {
				code += "module.exports = reverse;"
				break;
			}
			default: {
				console.log("Wrong problem ID.");
				break;
			}
		}

		var testVectors = [
		// problem 0: add two numbers
		[
		{a: 0, b: 0, sum: 0},
		{a: 0, b: 1, sum: 1},
		{a: 1, b: 0, sum: 1},
		{a: 1, b: 0, sum: 1},
		{a: 912, b: 121, sum: 1033},
		{a: -21, b: 10, sum: -11}
		],
		// problem 1: find maximum in an array
		[
		{array: [1, 3, 5], max: 5},
		{array: [9, 1, 0], max: 9},
		{array: [998, 123, 235], max: 998}
		],
		// problem 2: reverse a string
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
					for (var i = 0; i < testVectors[0].length; i++) {
						if (userfunction(testVectors[0][i].a, testVectors[0][i].b) != testVectors[0][i].sum) {
							// prepare failure message
							var failMessage = "Fail: "
							+ testVectors[0][i].a 
							+ " + " 
							+ testVectors[0][i].b
							+ " = " 
							+ testVectors[0][i].sum 
							+ ". However, the value calculated by your function is "
							+ userfunction(testVectors[0][i].a, testVectors[0][i].b);
							console.log(failMessage);
							mismatch = true;
							break;
						}
					}
					break; // not needed actually
				}
				case 1: {
					for (var i = 0; i < testVectors[1].length; i++) {
						if (userfunction(testVectors[1][i].array) != testVectors[1][i].max) {
							// prepare failure message
							var failMessage = "Fail: "
							+ "Maximum number of array " 
							+ testVectors[1][i].array 
							+ " is "
							+ testVectors[1][i].max
							+ ". However, the maximum number given by your function is "
							+ userfunction(testVectors[1][i].array);
							console.log(failMessage);
							mismatch = true;
							break;
						}
					}
					break; // not needed actually
				}
				case 2: {
					for (var i = 0; i < testVectors[2].length; i++) {
						if (userfunction(testVectors[2][i].str) != testVectors[2][i].reversedString) {
							// prepare failure message
							var failMessage = "Fail: "
							+ "The reversed string of "
							+ testVectors[2][i].str
							+ " is "
							+ testVectors[2][i].reversedString
							+ ". However, the string given by your function is "
							+ userfunction(testVectors[2][i].str);
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