var Fuzzy = require('../models/fuzzies').Fuzzy;
var mongoose = require('mongoose');
var async = require("async");
var fs=require('fs');
var sys=require('sys');
var mailer = require('nodemailer');


// Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "psih.fuzzies@gmail.com",
        pass: "psihrocks"
    }
});


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
			return res.render("person.ejs", {fuzzies: fuzzies, person: req.params.person});
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

	var mail = {
	    from: "PSIH 2014 <psih.fuzzies@gmail.com>",
	    to: "dhwari@gmail.com",
	    subject: "You got a psih fuzzy :)",
	    text: "Visit http://quiet-tor-9361.herokuapp.com/" + req.body.recipient + " to see your new fuzzy!",
	    html: "Click <a href='http://quiet-tor-9361.herokuapp.com/" + req.body.recipient + "'>here</a> to see your new fuzzy!"
	}

	smtpTransport.sendMail(mail, function(error, response){
	    if(error){
	        console.log(error);
	    }else{
	        console.log("Message sent: " + response.message);
	    }
	    
	    smtpTransport.close();
	});

	fuzzy.save(function(err, fuzzy) {
		if(err) {console.log(err);
		} else {
			res.redirect('/' + req.body.recipient);
		}
	});
};