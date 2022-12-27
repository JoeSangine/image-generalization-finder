const express = require("express");
const router = express.Router();
const CustomQueryController = require("../controllers/CustomQueryController");

router.post("/:originalQuery", CustomQueryController.createCustomQuery);
router.get("/:originalQuery", CustomQueryController.getCustomQueries);
router.delete("/:id", CustomQueryController.deleteCustomQuery);

module.exports = router;