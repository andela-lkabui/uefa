var mongoose = require("mongoose");

var TeamSchema = new mongoose.Schema({
	coach: String,
	country:String
});

module.exports = mongoose.model('Team', TeamSchema);