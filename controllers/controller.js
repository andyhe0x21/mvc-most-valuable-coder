"use strict";

(function() {
	// import model
	var model = require("../models/model.js");

	// import npm module
	var express = require("express");
	var bodyParser = require("body-parser");

	// create router instance
	var router = express.Router();

	// configure router
	router.get("/", function(req, res) {
		model.all(function(data) {
			console.log(data);
			var objRendered = {
				data: "Hello"
			};
			res.render("index", objRendered);
		});
	});

	// export route for server.js
	module.exports = router;
})();