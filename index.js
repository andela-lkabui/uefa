var express = require("express"),
		app = express(),
		port = process.env.PORT || 6048,
		router = express.Router();

var mongoose = require("mongoose"),
		Team = require("./models/team"),
		bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true}));

mongoose.connect("mongodb://admin:Propan3@ds042698.mongolab.com:42698/champions_league");

router.get("/", function(req, res) {
	res.json({message: "You are at the root path of the UEFA app."});
})

app.use("/uefa", router);

//route "/teams"
var teamsRoute = router.route("/teams");

//endpoint of /uefa/teams - POST
teamsRoute.post(function(req, res) {
	var team = new Team();

	//set the properties of team
	team.name = req.body.name;
	team.informal_name = req.body.informal_name;
	team.coach = req.body.coach;
	team.country = req.body.country;

	//save the team
	team.save(function(err) {
		if (err)
			res.send(err);

		res.json({message: "Team: " + team.name + " has been added!"});
	});
});

//endpoint of /uefa/teams - GET
teamsRoute.get(function(req, res) {
	Team.find(function(err, teams) {
		if (err)
			res.send(err);

		res.json(teams);
	});
});

//create a new route /uefa/teams/:club
var singleTeamRoute = router.route("/teams/:club_name");

//create endpoint /uefa/teams/:club - GET
singleTeamRoute.get(function(req, res) {
	Team.findById(req.params.club_name, function(err, team) {
		if (err)
			res.send(err);

		res.json(team);
	});
});

//create endpoint /uefa/teams/:club - PUT
singleTeamRoute.put(function(req, res) {

	Team.findById(req.params.club_name, function(err, team) {
		if (err) 
			res.send(err);

		team.coach = req.body.coach;

		team.save(function(err) {
			if (err)
				res.send(err);

			res.json(team);
		});
	});
});

//create endpoint /uefa/teams/:club - DELETE
singleTeamRoute.delete(function(req, res) {
	Team.findByIdAndRemove(req.params.club_name, function(err) {
		if (err)
			res.send(err);

		res.json({message: req.params.club_name + " has been removed from UEFA!"});
	});
});

app.listen(port);
console.log("UEFA on 'channel' " + port);