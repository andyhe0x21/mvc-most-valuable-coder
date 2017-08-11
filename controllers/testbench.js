"use strict";
(function() {
	function testbench(code, problemId) {

		// import eval
		var codeGenerator = require("eval");

		console.log("[TESTBENCH] User code is " + code);
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
			case 2: {
				console.log("here");
				code += "module.exports = findSingle;"
				break;
			}
			case 3: {
				code += "module.exports = climbStairs;"
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
		],
		// problem 2: single number
		[
		{array: [1, 2, 2, 1, 3], single: 3},
		{array: [123, 321, 321, 456, 123], single: 456},
		{array: [123, 321, 1912, 321, 456, 123, 456], single: 1912}
		],
		// problem 3: climb starts
		[
		{numStairs: 2, distinctWays: 2},
		{numStairs: 5, distinctWays: 8},
		{numStairs: 11, distinctWays: 144}
		]];

		try {
			// pass knwon test vector to user's function
			var userfunction = codeGenerator(code);

			var mismatch = false;

			console.log("[Testbench]: Problem is " + problemId);
			
			// run all test cases
			switch (problemId) {
				case 0: {
					for (var i = 0; i < testVectors[problemId].length; i++) {
						if (userfunction(testVectors[problemId][i].array) != testVectors[problemId][i].max) {
							// prepare failure message
							var failMessage = "Failed: "
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
							var failMessage = "Failed: "
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
				case 2: {
					for (var i = 0; i < testVectors[problemId].length; i++) {
						if (userfunction(testVectors[problemId][i].array) != testVectors[problemId][i].single) {
							// prepare failure message
							var failMessage = "Failed: "
							+ "The only single number of array ["
							+ testVectors[problemId][i].array
							+ "] is \""
							+ testVectors[problemId][i].single
							+ "\". However, the string given by your function is "
							+ userfunction(testVectors[problemId][i].array) 
							+ ".";
							console.log(failMessage);
							mismatch = true;
							break;
						}
					}
					break; // not needed actually
				}
				case 3: {
					for (var i = 0; i < testVectors[problemId].length; i++) {
						if (userfunction(testVectors[problemId][i].numStairs) != testVectors[problemId][i].distinctWays) {
							// prepare failure message
							var failMessage = "Failed: "
							+ "For "
							+ testVectors[problemId][i].numStairs
							+ "-step stair case, there are \""
							+ testVectors[problemId][i].distinctWays
							+ ". However, the number of distinct ways given by your function is "
							+ userfunction(testVectors[problemId][i].numStairs) 
							+ ".";
							console.log(failMessage);
							mismatch = true;
							break;
						}
					}
					break; // not needed actually
				}
				default: {
					console.log("[Testbench] Wrong problem ID.");
					break;
				}
			}
			if (mismatch) {
				return failMessage;
			}
			else {
				return "Congratulations! Your code has been accepted.";
			}
		}
		catch(error) {
			return "Compilation Failed: " + error;
		}
	}
	module.exports = testbench;
})();