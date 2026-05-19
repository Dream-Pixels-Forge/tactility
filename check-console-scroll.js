const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const allMessages = [];
  
  page.on('console', msg => {
    allMessages.push({ type: msg.type(), text: msg.text() });
  });
  
  page.on('pageerror', error => {
    allMessages.push({ type: 'pageerror', text: error.message });
  });
  
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    
    // Scroll through the page to trigger all sections
    const sections = ['kinetic', 'neural', 'locomotion', 'bento'];
    for (const section of sections) {
      try {
        await page.locator(`#${section}`).scrollIntoViewIfNeeded();
        await page.waitForTimeout(1500);
      } catch (e) {
        // Section might not exist, continue
      }
    }
    
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    
    console.log('=== ALL CONSOLE MESSAGES ===');
    allMessages.forEach(m => console.log(`[${m.type}] ${m.text}`));
    
    const warnings = allMessages.filter(m => m.type === 'warning' || m.type === 'error' || m.type === 'pageerror');
    console.log('\n=== WARNINGS & ERRORS ===');
    if (warnings.length === 0) {
      console.log('✓ No warnings or errors found!');
    } else {
      warnings.forEach(w => console.log(`[${w.type}] ${w.text}`));
    }
    
  } catch (e) {
    console.error('Error:', e.message);
  }
  
  await browser.close();
})();