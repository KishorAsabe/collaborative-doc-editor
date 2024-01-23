const Document = require("../models/Document");

const saveDocument = async (documentId, newData) => {
  try {
    // Find the document by ID
    const existingDocument = await Document.findById(documentId);

    if (!existingDocument) {
      throw new Error("Document not found");
    }

    // Update the data with the new changes
    existingDocument.data = newData;

    // Save the updated document
    await existingDocument.save();

    return existingDocument;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  saveDocument,
};
