const express = require("express");
const router = express.Router();
// const upload = require("../middleware/multer");
const FamousImageController = require("../controllers/FamousImageController");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now

router.post("/createFamousImage", FamousImageController.createFamousImage);
router.get("/:query", FamousImageController.getFamousImage);
// router.delete("/deletePost/:id", BadImagesController.deletePost);

module.exports = router;