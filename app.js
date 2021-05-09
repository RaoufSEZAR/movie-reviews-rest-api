const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

const movieRoutes = require("./api/routes/movies");
const reviewRoutes = require("./api/routes/reviews");
const userRoutes = require("./api/routes/user");

mongoose.connect(
	"mongodb+srv://user:user123456@cluster0.zctom.mongodb.net/movies?retryWrites=true&w=majority",
	{
		//useMongoClient = true,
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	}
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//for CORS
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin,X-Requested-With,Content-Type,Accept,Authorization"
	);
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,GET,DELETE");
		return res.status(200).json({});
	}
	next();
});

//routes should handle requests
app.use("/reviews", reviewRoutes);
app.use("/movies", movieRoutes);
app.use("/users", userRoutes);

//handle the error
app.use((req, res, next) => {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({ error: { message: error.message } });
});
module.exports = app;
