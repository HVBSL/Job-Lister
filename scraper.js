const puppeteer = require('puppeteer');

async function scrapeJobs() {
  const jobs = [];

  const sources = [
    { name: 'Wellfound', url: 'https://wellfound.com/jobs', selector: '.styles_component__2psWI' },
    { name: 'Naukri', url: 'https://www.naukri.com/software-developer-jobs', selector: '.jobTuple' },
    { name: 'Indeed', url: 'https://www.indeed.com/jobs?q=software+developer&l=India', selector: '.result' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/search/?keywords=software%20developer', selector: '.base-card' }
  ];

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  for (const source of sources) {
    try {
      await page.goto(source.url, { waitUntil: 'networkidle2', timeout: 60000 });
      const jobsFromSite = await page.evaluate((selector, site) => {
        const nodes = document.querySelectorAll(selector);
        const jobList = [];
        nodes.forEach((el, i) => {
          const text = el.innerText || '';
          if (text && i < 3) {
            jobList.push([
              new Date().toISOString().split('T')[0],
              `${site} Company ${i + 1}`,
              'Location',
              `Developer Role from ${site}`,
              'React, Node.js',
              '✅', '❌', 'Pending', `${site} scraped job`
            ]);
          }
        });
        return jobList;
      }, source.selector, source.name);

      jobs.push(...jobsFromSite);
    } catch (err) {
      console.error(`❌ Failed to scrape ${source.name}:`, err.message);
    }
  }

  await browser.close();
  return jobs.slice(0, 10);
}

module.exports = { scrapeJobs };