const mongoose = require("mongoose");
const reviewschema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	movie: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Movie",
		required: true,
	},
	rate: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
	},
	title: {
		type: String,
	},
});
module.exports = mongoose.model("Review", reviewschema);
