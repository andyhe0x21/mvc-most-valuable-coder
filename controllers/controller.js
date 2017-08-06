"use strict";

(function() {
	// import model
	////var model = require("../models/model.js");

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
		res.render("index", {data: "Hello"});
		/*model.all(function(data) {
			console.log(data);
			var objRendered = {
				data: "Hello"
			};
			res.render("index", objRendered);
		});*/
	});

	router.post("/api/run_code", function(req, res) {

		// receive code from front-end javascript
		var code = req.body.userCode;
		var problemId = req.body.problemId;

		// pass user's code to the testbench
		var result = testbench(code, parseInt(problemId));

		// send response to fron-end
		res.json({result: result});
	});

	// export route for server.js
	module.exports = router;
})();