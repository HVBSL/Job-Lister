const cron  = require('node-cron');
const { updateSheet } = require('./updateSheet');
const { updateDoc } = require('./updateDoc');
require('dotenv').config();
const { scrapeJobs } = require('./scraper');

async function runJobAutomation() {
  const jobs = await scrapeJobs();

  const letters = jobs.map((job, i) => 
    `Dear Hiring Manager at ${job[1]},\n\nI’m excited to apply for the ${job[3]} role in ${job[2]}. My background in ${job[4]} aligns well with your needs.\n\nLooking forward to the opportunity.\n\nBest,\nBalaji\n`
  );

  await updateSheet(jobs);
  await updateDoc(letters);
}

// Schedule job to run every day at 8:00 AM
cron.schedule('0 8 * * *', () => {
  console.log('🚀 Running daily job automation at 8 AM...');
  runJobAutomation();
});

// main().catch(console.error);
// Run once at startup too
runJobAutomation();