var Fuzzy = require('../models/fuzzies').Fuzzy;
var mongoose = require('mongoose');
var async = require("async");
var fs=require('fs');
var sys=require('sys');

var ObjectId= mongoose.Types.ObjectId;

//Page: homepage
exports.home = function(req, res) {
	res.render("main.ejs");
};

//Page: admin page
exports.admin = function(req, res) {
	Fuzzy.list(function (err, fuzzies) {
		if(err) {
			return res.send(404);
		} else {
			return res.render("all.ejs", {fuzzies: fuzzies});
		}
	});
};

//Page: individual page
exports.person = function(req, res) {
		Fuzzy.queryByRecipient(req.params.person, function(err, fuzzies) {
			return res.render("person.ejs", {fuzzies: fuzzies});
		});
	};

/*--------------  Helper functions ----------- */

exports.create = function(req, res) {
	var fuzzy = new Fuzzy({
		author : req.body.author,
		recipient : req.body.recipient,
		text : req.body.text,
		color: req.body.color,
		});

	fuzzy.save(function(err, fuzzy) {
		if(err) {console.log(err);
		} else {
			res.redirect('/' + req.body.recipient);
		}
	});
};