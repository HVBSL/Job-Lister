const { google } = require('googleapis');
const auth = require('./auth');

async function updateSheet(jobs) {
  const authClient = await auth();
  const sheets = google.sheets({ version: 'v4', auth: authClient });
  const sheetId = process.env.SPREADSHEET_ID;

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'Sheet1',
    valueInputOption: 'RAW',
    requestBody: {
      values: jobs,
    },
  });

  console.log("✅ Google Sheet updated");
}

module.exports = { updateSheet };