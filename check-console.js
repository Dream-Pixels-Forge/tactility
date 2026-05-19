const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const consoleMessages = [];
  const errors = [];

  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    consoleMessages.push({ type, text });
    if (type === 'error') {
      errors.push(text);
    }
  });

  page.on('pageerror', err => {
    errors.push(err.message);
  });

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });

    // Scroll through page to trigger lazy-loaded content
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);

    console.log('=== CONSOLE MESSAGES ===');
    consoleMessages.forEach(m => console.log(`[${m.type}] ${m.text}`));

    console.log('\n=== ERRORS ===');
    if (errors.length === 0) {
      console.log('No errors found!');
    } else {
      errors.forEach(e => console.log(e));
    }

    console.log('\n=== SUMMARY ===');
    console.log(`Total messages: ${consoleMessages.length}`);
    console.log(`Errors: ${errors.length}`);
    console.log(`Warnings: ${consoleMessages.filter(m => m.type === 'warning').length}`);

  } catch (e) {
    console.log('Error:', e.message);
  }

  await browser.close();
})();