const express = require("express");
const router = express.Router();

const documentController = require("../controller/Document");

router.get("/:documentId", documentController.getDocument);

module.exports = router;
