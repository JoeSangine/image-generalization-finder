const express = require("express");
const router = express.Router();
// const upload = require("../middleware/multer");
const BadImagesController = require("../controllers/BadImagesController");
const { ensureAPIAuth } = require("../middleware/auth");

//Post Routes - simplified for now

router.post("/createBadImage", ensureAPIAuth, BadImagesController.createBadImage);

router.delete("/:id", ensureAPIAuth, BadImagesController.removeBadImage);

module.exports = router;
