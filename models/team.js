var mongoose = require("mongoose");

var TeamSchema = new mongoose.Schema({
	name: String,
	informal_name: String,
	coach: String,
	country:String
});

module.exports = mongoose.model('Team', TeamSchema);