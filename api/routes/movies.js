const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const MoviesController = require("../controller/movie");

router.get("/", MoviesController.getAllMovies);

router.post("/", checkAuth, MoviesController.createMovies);

router.get("/:MovieId", MoviesController.getMovie);

router.patch("/:MovieId", checkAuth, MoviesController.updateMovies);

router.delete("/:MovieId", checkAuth, MoviesController.deleteMovie);

module.exports = router;
