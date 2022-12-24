const express = require("express");
const router = express.Router();
// const upload = require("../middleware/multer");
const BadImagesController = require("../controllers/BadImagesController");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now

router.post("/createBadImage", BadImagesController.createBadImage);

router.delete("/:id", BadImagesController.removeBadImage);

module.exports = router;
