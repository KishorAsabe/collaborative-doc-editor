const Document = require("../models/Document");
const DocumentController = require("../controller/DocumentController");


const findOrCreateDocument = async (id) => {
  try {
    if (!id) return;

    const document = await Document.findById(id);
    if (document) return document;

    const defaultValue = "";
    return await Document.create({ _id: id, data: defaultValue });
  } catch (error) {
    console.error("Error finding or creating document:", error.message);
    throw error;
  }
};


const saveDocument = async (documentId, newData) => {
  try {
    return await DocumentController.saveDocument(documentId, newData);
  } catch (error) {
    throw error;
  }
};


module.exports = { findOrCreateDocument,saveDocument};


