// const Document = require("../models/Document");
const documentService = require("../services/documentService");

const getDocument = async (req, res) => {
  try {
    const documentId = req.params.documentId;

    const document = await documentService.findOrCreateDocument(documentId);

    res.json({ data: document.data });
  } catch (error) {
    console.error("Error getting document:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  getDocument,
};
