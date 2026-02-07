import { webkit } from 'playwright';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3002';
// Use first project page for testing
const ROUTE = process.env.ROUTE || '/projects/bittorrent';

async function verifyCarousel() {
  console.log(`Opening ${BASE_URL}${ROUTE}...`);
  
  const browser = await webkit.launch({ 
    headless: true
  });
  const page = await browser.newPage();
  
  try {
    await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: 'networkidle' });
    
    // Wait for the carousel track element (allow hidden elements)
    console.log('Waiting for carousel track...');
    await page.waitForSelector('[data-testid="projects-carousel-track"]', {
      timeout: 10000,
      state: 'attached' // Don't require visibility
    });
    
    const track = await page.$('[data-testid="projects-carousel-track"]');
    if (!track) {
      throw new Error('Carousel track not found');
    }
    
    // Wait a bit for initial render and animation to start
    await page.waitForTimeout(500);
    
    // Get initial transform at t=0
    const transform0 = await track.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.transform;
    });
    
    console.log(`Transform at t=0: ${transform0}`);
    
    // Wait ~1200ms
    await page.waitForTimeout(1200);
    
    // Get transform after delay
    const transform1 = await track.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.transform;
    });
    
    console.log(`Transform at t=1200ms: ${transform1}`);
    
    // Check if transform changed (movement occurred)
    if (transform0 === transform1) {
      console.error('❌ FAIL: Transform unchanged - carousel is not moving');
      
      // Diagnostic checks
      console.log('\nDiagnostics:');
      
      // Check if prefers-reduced-motion is enabled
      const prefersReducedMotion = await page.evaluate(() => {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      });
      console.log(`prefers-reduced-motion: ${prefersReducedMotion}`);
      
      // Check if element is visible
      const isVisible = await track.isVisible();
      console.log(`Element visible: ${isVisible}`);
      
      // Check element dimensions
      const box = await track.boundingBox();
      console.log(`Element dimensions: ${box ? `${box.width}x${box.height}` : 'null'}`);
      
      // Check computed width
      const width = await track.evaluate((el) => {
        return el.scrollWidth;
      });
      console.log(`Track scrollWidth: ${width}`);
      
      // Check if transform is applied
      const hasTransform = transform0 !== 'none' && transform0 !== '';
      console.log(`Has transform: ${hasTransform}`);
      
      await browser.close();
      process.exit(1);
    } else {
      console.log('✅ PASS: Carousel is moving');
      await browser.close();
      process.exit(0);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    // Check if page loaded
    const title = await page.title().catch(() => 'N/A');
    console.log(`Page title: ${title}`);
    
    // Check if element exists at all
    const exists = await page.$('[data-testid="projects-carousel-track"]').catch(() => null);
    console.log(`Element exists: ${exists !== null}`);
    
    await browser.close();
    process.exit(1);
  }
}

verifyCarousel();
