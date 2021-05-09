const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const reviewsController = require("../controller/review");

router.get("/", reviewsController.get_all_reviews);

router.post("/", checkAuth, reviewsController.createreviews);

router.get("/:ReviweId", reviewsController.getReview);

router.patch("/:ReviweId", checkAuth, reviewsController.updatereviews);

router.delete("/:ReviweId", checkAuth, reviewsController.deleteReview);

module.exports = router;
