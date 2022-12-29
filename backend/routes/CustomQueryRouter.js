const express = require("express");
const router = express.Router();
const CustomQueryController = require("../controllers/CustomQueryController");
const upload = require("../middleware/multer");

router.post("/:originalQuery", upload.single('image'), CustomQueryController.createCustomQuery);
router.get("/:originalQuery", CustomQueryController.getCustomQueries);
router.delete("/:id", CustomQueryController.deleteCustomQuery);

module.exports = router;