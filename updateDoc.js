const { google } = require('googleapis');
const auth = require('./auth');

async function updateDoc(letters) {
  const authClient = await auth();
  const docs = google.docs({ version: 'v1', auth: authClient });
  const docId = process.env.DOCUMENT_ID;

  const requests = letters.map((letter, i) => ({
    insertText: {
      location: { index: 1 },
      text: `\n${i + 1}. ${letter}\n`
    }
  }));

  await docs.documents.batchUpdate({
    documentId: docId,
    requestBody: { requests },
  });

  console.log("✅ Google Doc updated");
}

module.exports = { updateDoc };