const express = require("express");
const { sendEmailController } = require("../controllers/PortFolioController");
const router = express.Router();

router.post("/sendEmail", sendEmailController);

module.exports = router;
