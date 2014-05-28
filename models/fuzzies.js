var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FuzzySchema = new Schema({
  author: { type: String, default: '', trim : true },
  recipient: {type: String, default: '', trim : true },
  text: { type: String, default: '', trim : true },
  submittedAt : {type: Date, default: Date.now},
  color: { type: String, default: '#FFFFFF', trim : true },
});

FuzzySchema.statics = {
	list: function (cb) {
		this.find().exec(cb);
	},
	queryByRecipient: function(name, cb) {
		this.find({recipient: name}).exec(cb);
	}
};

var fuzzy = mongoose.model("Fuzzy", FuzzySchema);

module.exports = {
	Fuzzy : fuzzy
};