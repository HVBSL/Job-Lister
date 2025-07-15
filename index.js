require('dotenv').config();
const { updateSheet } = require('./updateSheet');
const { updateDoc } = require('./updateDoc');

async function main() {
  const jobs = [
    ["2025-07-16", "Company A", "Chennai", "React Developer", "React, Node.js", "✅", "❌", "Pending", "Startup vibe"],
    ["2025-07-16", "Company B", "Bangalore", ".NET Developer", "ASP.NET, MSSQL", "✅", "❌", "Pending", "Stable role"]
  ];

  const letters = jobs.map((job, i) => `Dear Hiring Manager at ${job[1]},\n\nI’m excited to apply for the ${job[3]} position in ${job[2]}. I bring experience in ${job[4]} and am passionate about building impactful applications.\n\nBest regards,\nBalaji\n`);

  await updateSheet(jobs);
  await updateDoc(letters);
}

main().catch(console.error);