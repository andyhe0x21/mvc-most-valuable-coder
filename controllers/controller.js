"use strict";

(function() {
	// import model
	var model = require("../models/model.js");

	// import testbench
	var testbench = require("./testbench.js");

	// import problems

	// import npm module
	var express = require("express");
	var bodyParser = require("body-parser");

	// create router instance
	var router = express.Router();

	// configure router
	router.get("/", function(req, res) {

		var objRendered = {
			data: "Hello"
		};
		res.render("index", objRendered);
	});

	router.post("/api/run_code", function(req, res) {

		// receive object that contains code from front-end javascript
		var code = req.body.userCode;
		var problemId = req.body.problemId;

		// pass user's code to the testbench
		var result = testbench(code, parseInt(problemId));

		// send response to fron-end
		res.json({result: result});
	});

	router.post("/api/add_result_to_db", function(req, res) {
		
		// receive object that contains user name and time from front-end javascript
		var userName = req.body.name;
		var userTime = req.body.time;
		var problemId = req.body.problemId;

		// first see if the user exists
		model.searchUser(userName, function(result) {
			if (result[0]) {
				console.log("User " + userName + "already exists!");
				model.update(userName, problemId, userTime, function() {
					console.log("Finished update time.");
				});
			}
			else {
				model.add(userName, function(result) {
					console.log("Finished adding user.");
					model.update(userName, problemId, userTime, function() {
						console.log("Finished update time.");
					});
				});
			}
		});

		res.end();
	});

	router.get("/api/get_rank/:problemId?", function(req, res) {
		// get problem ID
		 var problemId = req.params.problemId;
		 console.log("Trying to get rank for problem #" + problemId);
		 model.searchTopUsersForProblem(problemId, function(result) {
		 	//console.log("Top 5 users are " + result[0].problem_0_time);
		 	res.json(result);
		 });

	})

	// export route for server.js
	module.exports = router;
})();