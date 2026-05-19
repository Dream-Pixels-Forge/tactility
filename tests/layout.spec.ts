import { test, expect } from '@playwright/test';

test.describe('Tactility Layout Capture & Validation', () => {
  const resolutions = [
    { name: 'mobile', width: 375, height: 812 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop-small', width: 1440, height: 900 },
    { name: 'desktop-large', width: 1920, height: 1080 },
  ];

  for (const { name, width, height } of resolutions) {
    test(`Capture ${name} view (${width}x${height})`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('http://localhost:3013');
      await page.waitForTimeout(3000); // Wait for fonts/GSAP/animations to settle
      await page.screenshot({
        path: `dev_notes/captured/layout-${name}.png`,
        fullPage: true,
      });
      console.log(`✓ Captured ${name} view`);
    });
  }

  test('Check for layout issues', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3013');
    await page.waitForTimeout(3000);

    // 1. Check for text clipping
    const clippedText = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const clipped: string[] = [];
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        if (el.textContent?.trim() && rect.width > 0 && rect.height > 0) {
          if (style.overflow === 'hidden' && el.scrollWidth > rect.width + 2) {
            clipped.push(`${el.tagName}.${el.className.slice(0,40)}`);
          }
        }
      });
      return clipped.slice(0, 20);
    });

    if (clippedText.length > 0) {
      console.log('⚠ Potential text clipping detected:');
      clippedText.forEach(t => console.log(`   ${t}`));
    } else {
      console.log('✓ No text clipping detected');
    }

    // 2. Check for overlapping elements (nav vs sections)
    const overlaps = await page.evaluate(() => {
      const selectors = [
        'nav', '.nav', 'header',
        '.sticky',
        'section[id]',
        'h1', 'h2',
        'button'
      ];
      const elements: { tag: string; id: string; rect: { top: number; bottom: number; left: number; right: number } }[] = [];
      
      selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0 && rect.width < window.innerWidth * 1.5) {
            elements.push({
              tag: el.tagName,
              id: (el as HTMLElement).id || el.className.slice(0,20),
              rect: { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right }
            });
          }
        });
      });

      const issues: string[] = [];
      for (let i = 0; i < elements.length; i++) {
        for (let j = i + 1; j < elements.length; j++) {
          const a = elements[i].rect;
          const b = elements[j].rect;
          const overlapX = !(a.right < b.left || a.left > b.right);
          const overlapY = !(a.bottom < b.top || a.top > b.bottom);
          if (overlapX && overlapY) {
            const intersectW = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
            const intersectH = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
            const area = intersectW * intersectH;
            if (area > 5000) {
              issues.push(`${elements[i].tag}#${elements[i].id} ↔ ${elements[j].tag}#${elements[j].id} (${Math.round(intersectW)}x${Math.round(intersectH)})`);
            }
          }
        }
      }
      return issues.slice(0, 10);
    });

    if (overlaps.length > 0) {
      console.log('⚠ Potential unwanted overlaps:');
      overlaps.forEach(o => console.log(`   ${o}`));
    } else {
      console.log('✓ No unwanted overlaps detected');
    }

    // 3. Check all images are loaded
    const brokenImages = await page.evaluate(() => {
      const imgs = document.querySelectorAll('img');
      const broken: string[] = [];
      imgs.forEach((img, i) => {
        if (!img.complete || img.naturalWidth === 0) {
          broken.push(`img[${i}] src="${(img.getAttribute('src')||'').slice(0,50)}"`);
        }
      });
      return broken;
    });

    if (brokenImages.length > 0) {
      console.log(`⚠ ${brokenImages.length} broken images found`);
      brokenImages.forEach(b => console.log(`   ${b}`));
    } else {
      console.log('✓ All images loaded correctly');
    }

    // 4. Check console for JS errors
    const errors = page.listeners('pageerror');
    console.log(`JS errors captured: ${errors.length}`);

    await page.screenshot({
      path: 'dev_notes/captured/layout-analysis.png',
      fullPage: true,
    });
    console.log('✓ Analysis screenshot saved');
  });

  test('Check nav scroll-to-section works', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3013');
    await page.waitForTimeout(2000);

    const navButtons = [
      { text: 'MANIFESTO', target: 'manifesto' },
      { text: 'KINETIC', target: 'kinetic' },
      { text: 'CONNECT', target: 'cta' },
    ];

    for (const btn of navButtons) {
      const navBtn = page.locator('nav button, .nav button, header button', { hasText: btn.text }).first();
      if (await navBtn.isVisible()) {
        await navBtn.click();
        await page.waitForTimeout(1000);
        const section = page.locator(`#${btn.target}`);
        await expect(section).toBeVisible();
        console.log(`✓ Nav "${btn.text}" → #${btn.target}`);
      } else {
        console.log(`⚠ Nav button "${btn.text}" not found`);
      }
    }
  });
});
