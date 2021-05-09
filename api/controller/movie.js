const mongoose = require("mongoose");

const Movie = require("../models/movie");

exports.getAllMovies = (req, res, next) => {
	Movie.find()
		.select("name reviews actors _id genre year")
		.exec()
		.then((docs) => {
			const response = {
				count: docs.length,
				Movies: docs.map((doc) => {
					return {
						name: doc.name,
						genre: doc.genre,
						year: doc.year,
						_id: doc._id,
						reviews: doc.reviews,
						actors: doc.actors,
						request: {
							type: "GET",
							url: "http://localhost:3000/movies/" + doc._id,
						},
					};
				}),
			};
			res.status(200).json(response);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

exports.createMovies = (req, res, next) => {
	const movie = new Movie({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		genre: req.body.genre,
		year: req.body.year,
		actors: req.body.actors,
		reviews: req.body.reviews,
	});
	movie
		.save()
		.then((result) => {
			console.log(result);
			res.status(201).json({
				message: "Created successfuly Movies",
				createdMovie: {
					name: result.name,
					genre: result.genre,
					year: result.year,
					actors: result.actors,
					reviews: result.reviews,
					_id: result._id,
					request: {
						type: "GET",
						url: "http://localhost:3000/movies/" + result._id,
					},
				},
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

exports.getMovie = (req, res, next) => {
	const id = req.params.MovieId;
	Movie.findById(id)
		.select("name year actors _id reviws")
		.exec()
		.then((doc) => {
			console.log("From DB", doc);
			if (doc) {
				res.status(200).json({
					Movies: doc,
					request: {
						type: "GET",
						description: "GET_ALL_MovieS",
						url: "http://localhost:3000/movies",
					},
				});
			} else {
				res
					.status(404)
					.json({ message: "No valid entry found for provided ID" });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

exports.updateMovies = (req, res, next) => {
	const id = req.params.MovieId;
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	Movie.update({ _id: id }, { $set: updateOps })
		.exec()
		.then((result) => {
			res.status(200).json({
				message: "Movie updated",
				request: {
					type: "GET",
					url: "http://localhost:3000/movies/" + id,
				},
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

exports.deleteMovie = (req, res, next) => {
	const id = req.params.MovieId;
	Movie.deleteOne({ _id: id })
		.exec()
		.then((result) => {
			res.status(200).json({
				message: "Movie deleted",
				request: {
					type: "POST",
					url: "http://localhost:3000/movies/",
					body: { name: "String", price: "Number" },
				},
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};
