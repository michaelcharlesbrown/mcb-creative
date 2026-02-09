import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3002';
const ROUTE = '/projects';

async function testProjectsPage() {
  console.log(`Testing ${BASE_URL}${ROUTE}...`);
  
  const browser = await chromium.launch({ 
    headless: false // Show browser for debugging
  });
  const page = await browser.newPage();
  
  // Listen for console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error('❌ Console Error:', msg.text());
    } else {
      console.log(`📝 Console ${msg.type()}:`, msg.text());
    }
  });
  
  // Listen for page errors
  page.on('pageerror', error => {
    console.error('❌ Page Error:', error.message);
    console.error('Stack:', error.stack);
  });
  
  // Listen for failed requests
  page.on('requestfailed', request => {
    console.error('❌ Request Failed:', request.url(), request.failure()?.errorText);
  });
  
  try {
    console.log('Navigating to page...');
    await page.goto(`${BASE_URL}${ROUTE}`, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    console.log('Page loaded. Waiting for content...');
    
    // Wait a bit for React to hydrate
    await page.waitForTimeout(2000);
    
    // Check for errors in the page
    const errors = await page.evaluate(() => {
      const errors = [];
      
      // Check for React errors
      if (window.__REACT_ERROR_OVERLAY_GLOBAL_HOOK__) {
        const hook = window.__REACT_ERROR_OVERLAY_GLOBAL_HOOK__;
        if (hook.errors && hook.errors.length > 0) {
          errors.push(...hook.errors.map(e => e.error?.message || String(e)));
        }
      }
      
      // Check console errors
      const consoleErrors = [];
      const originalError = console.error;
      console.error = (...args) => {
        consoleErrors.push(args.join(' '));
        originalError.apply(console, args);
      };
      
      return {
        reactErrors: errors,
        consoleErrors: consoleErrors
      };
    });
    
    if (errors.reactErrors.length > 0 || errors.consoleErrors.length > 0) {
      console.error('❌ Found errors:');
      errors.reactErrors.forEach(e => console.error('  React:', e));
      errors.consoleErrors.forEach(e => console.error('  Console:', e));
    }
    
    // Check if projects are rendered
    const projectCount = await page.evaluate(() => {
      const sections = document.querySelectorAll('section');
      return sections.length;
    });
    
    console.log(`Found ${projectCount} project sections`);
    
    // Check scroll container
    const scrollInfo = await page.evaluate(() => {
      const container = document.querySelector('[class*="overflow-y-scroll"]');
      if (!container) return null;
      
      return {
        scrollHeight: container.scrollHeight,
        clientHeight: container.clientHeight,
        scrollTop: container.scrollTop,
        exists: true
      };
    });
    
    console.log('Scroll container info:', scrollInfo);
    
    // Try scrolling
    console.log('Testing scroll...');
    await page.evaluate(() => {
      const container = document.querySelector('[class*="overflow-y-scroll"]');
      if (container) {
        container.scrollTop = 1000;
      }
    });
    
    await page.waitForTimeout(1000);
    
    const scrollAfter = await page.evaluate(() => {
      const container = document.querySelector('[class*="overflow-y-scroll"]');
      return container ? container.scrollTop : null;
    });
    
    console.log(`Scroll position after: ${scrollAfter}`);
    
    // Take a screenshot for debugging
    await page.screenshot({ path: 'projects-page-debug.png', fullPage: true });
    console.log('Screenshot saved to projects-page-debug.png');
    
    // Check for images
    const imageInfo = await page.evaluate(() => {
      const images = document.querySelectorAll('img');
      return Array.from(images).map(img => ({
        src: img.src,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight
      }));
    });
    
    console.log(`Found ${imageInfo.length} images`);
    imageInfo.slice(0, 5).forEach((img, i) => {
      console.log(`  Image ${i + 1}: ${img.src.substring(0, 80)}... (complete: ${img.complete})`);
    });
    
    // Keep browser open for manual inspection
    console.log('\n✅ Test complete. Browser will stay open for 10 seconds for inspection...');
    await page.waitForTimeout(10000);
    
    await browser.close();
  } catch (error) {
    console.error('❌ Test Error:', error.message);
    console.error('Stack:', error.stack);
    
    // Take screenshot on error
    try {
      await page.screenshot({ path: 'projects-page-error.png', fullPage: true });
      console.log('Error screenshot saved to projects-page-error.png');
    } catch (e) {
      console.error('Failed to take screenshot:', e.message);
    }
    
    await browser.close();
    process.exit(1);
  }
}

testProjectsPage();
