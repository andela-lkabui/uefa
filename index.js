var express = require("express"),
		app = express(),
		port = process.env.PORT || 6048,
		router = express.Router();

var mongoose = require("mongoose"),
		Beer = require("./models/team"),
		bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true}));

mongoose.connect("mongodb://admin:Propan3@ds042698.mongolab.com:42698/champions_league");

router.get("/", function(req, res) {
	res.json({message: "You are at the root path of the UEFA app."});
})

app.use("/api", router);

app.listen(port);
console.log("UEFA on 'channel' " + port);