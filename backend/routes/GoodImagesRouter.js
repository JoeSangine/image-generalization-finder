const express = require("express");
const router = express.Router();
const GoodImagesController = require("../controllers/GoodImagesController");
const upload = require("../middleware/multer");
const { ensureAPIAuth } = require("../middleware/auth");

router.post("/:query", ensureAPIAuth, upload.single('image'), GoodImagesController.createGoodImage);
router.get("/:query", ensureAPIAuth, GoodImagesController.getGoodImages);
router.delete("/:id", ensureAPIAuth, GoodImagesController.deleteGoodImage);

module.exports = router;