const mongoose = require("mongoose");
const movieSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		unique: true,
		required: true,
	},
	genre: {
		type: String,
		required: true,
	},
	year: {
		type: String,
		required: true,
	},
	actors: [
		{
			type: String,
		},
	],
	reviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Review",
		},
	],
});
module.exports = mongoose.model("Movie", movieSchema);
