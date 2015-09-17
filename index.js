var express = require("express"),
		app = express(),
		port = process.env.PORT || 6048,
		router = express.Router();

router.get("/", function(req, res) {
	res.json({message: "You are at the root path of the UEFA app."});
})

app.use("/api", router);

app.listen(port);
console.log("UEFA on 'channel' " + port);