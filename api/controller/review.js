const mongoose = require("mongoose");

const Review = require("../models/review");
const Movie = require("../models/movie");

exports.get_all_reviews = (req, res, next) => {
	Review.find()
		// .select("Movie _id quantity")
		.populate("movie", "title")
		.exec()
		.then((docs) => {
			res.status(200).json({
				count: docs.length,
				reviews: docs.map((doc) => {
					return {
						_id: doc._id,
						movie: doc.movie,
						title: doc.title,
						rate: doc.rate,
						description: doc.description,
						request: {
							type: "GET",
							url: "http://localhost:3000/Movies/" + doc._id,
						},
					};
				}),
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

exports.createreviews = (req, res, next) => {
	Movie.findById(req.body.movie)
		.then((movie) => {
			if (!movie) {
				return res.status(404).json({
					message: "movie not found",
				});
			}
			const review = new Review({
				_id: mongoose.Types.ObjectId(),
				movie: req.body.movie,
				title: req.body.title,
				rate: req.body.rate,
				description: req.body.description,
			});

			return review.save();
		})
		.then((result) => {
			console.log(result);
			res.status(201).json({
				message: "Review stored",
				createdReview: {
					_id: result._id,
					movie: result.movieId,
					title: result.title,
					rate: result.rate,
					description: result.description,
				},
				request: {
					type: "GET",
					url: "http://localhost:3000/reviews/" + result._id,
				},
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

exports.getReview = (req, res, next) => {
	Review.findById(req.params.ReviewId)
		.populate("movie")
		.exec()
		.then((review) => {
			if (!review) {
				return res.status(404).json({
					message: "review not found",
				});
			}
			res.status(200).json({
				Review: Review,
				request: {
					type: "GET",
					url: "http://localhost:3000/reviews/",
				},
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
};

exports.updatereviews = (req, res, next) => {
	const id = req.params.ReviweId;
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	Reviwe.update({ _id: id }, { $set: updateOps })
		.exec()
		.then((result) => {
			res.status(200).json({
				message: "Reviwe updated",
				request: {
					type: "GET",
					url: "http://localhost:3000/reviews/" + id,
				},
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

exports.deleteReview = (req, res, next) => {
	const id = req.params.ReviewId;
	Review.deleteOne({ _id: id })
		.exec()
		.then((result) => {
			res.status(200).json({
				message: "Review deleted",
				request: {
					type: "POST",
					url: "http://localhost:3000/reviews/",
					body: { MovieId: "ID", quantity: "Number" },
				},
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};
