const express = require("express");
const router = express.Router();
const CustomQueryController = require("../controllers/CustomQueryController");
const upload = require("../middleware/multer");
const { ensureAPIAuth } = require("../middleware/auth");

router.post("/:originalQuery", ensureAPIAuth, upload.single('image'), CustomQueryController.createCustomQuery);
router.get("/:originalQuery", ensureAPIAuth, CustomQueryController.getCustomQueries);
router.delete("/:id", ensureAPIAuth, CustomQueryController.deleteCustomQuery);

module.exports = router;