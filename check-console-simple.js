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
    await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(5000);
    
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