var express = require('express');
var app = express();
var Project = require('./models/fuzzies.js').Fuzzy;
var mongoose = require("mongoose");

var uristring =
	process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
	'mongodb://localhost/fuzzies';

mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});

//controllers
var controller = require('./controllers/controller.js');
app.use(express.static(__dirname + '/public'));


app.use(express.bodyParser())
   .use(express.methodOverride())
   .use(app.router)
   .use(express.multipart());

app.use(express.logger("default"));

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});

app.get("/", controller.home);
app.get("/:person", controller.person);
app.post("/submit", controller.create);
app.get("/admin", controller.admin);

module.exports = app;