import { webkit } from 'playwright';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3002';
// Use first project page for testing
const ROUTE = process.env.ROUTE || '/projects/bittorrent';

async function verifyCarouselVisible() {
  console.log(`Opening ${BASE_URL}${ROUTE}...`);
  
  const browser = await webkit.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: 'networkidle' });
    
    // Wait for the carousel wrapper element
    console.log('Waiting for carousel wrapper...');
    await page.waitForSelector('[data-testid="projects-carousel"]', {
      timeout: 10000,
      state: 'attached'
    });
    
    const wrapper = await page.$('[data-testid="projects-carousel"]');
    if (!wrapper) {
      throw new Error('Carousel wrapper not found');
    }
    
    // Check if wrapper is visible
    const isVisible = await wrapper.isVisible();
    if (!isVisible) {
      throw new Error('Carousel wrapper exists but is not visible');
    }
    
    console.log('✅ Carousel wrapper found and visible');
    
    // Wait for the track element
    console.log('Waiting for carousel track...');
    await page.waitForSelector('[data-testid="projects-carousel-track"]', {
      timeout: 10000,
      state: 'attached'
    });
    
    const track = await page.$('[data-testid="projects-carousel-track"]');
    if (!track) {
      throw new Error('Carousel track not found');
    }
    
    // Count cards/links in the track
    const cardCount = await track.$$eval('a', (links) => links.length);
    
    console.log(`Found ${cardCount} cards/links in carousel`);
    
    if (cardCount < 3) {
      throw new Error(`Expected at least 3 cards, found ${cardCount}`);
    }
    
    // Check if track is visible
    const trackVisible = await track.isVisible();
    if (!trackVisible) {
      throw new Error('Carousel track exists but is not visible');
    }
    
    // Get bounding box to verify dimensions
    const box = await track.boundingBox();
    if (!box || box.width === 0 || box.height === 0) {
      throw new Error(`Carousel track has invalid dimensions: ${box ? `${box.width}x${box.height}` : 'null'}`);
    }
    
    console.log(`✅ Carousel track visible with dimensions: ${box.width}x${box.height}`);
    console.log(`✅ PASS: Carousel is visible with ${cardCount} cards`);
    
    await browser.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ FAIL:', error.message);
    
    // Diagnostic checks
    console.log('\nDiagnostics:');
    
    // Check if page loaded
    const title = await page.title().catch(() => 'N/A');
    console.log(`Page title: ${title}`);
    
    // Check if wrapper exists
    const wrapperExists = await page.$('[data-testid="projects-carousel"]').catch(() => null);
    console.log(`Wrapper exists: ${wrapperExists !== null}`);
    
    if (wrapperExists) {
      const wrapperVisible = await wrapperExists.isVisible().catch(() => false);
      console.log(`Wrapper visible: ${wrapperVisible}`);
    }
    
    // Check if track exists
    const trackExists = await page.$('[data-testid="projects-carousel-track"]').catch(() => null);
    console.log(`Track exists: ${trackExists !== null}`);
    
    if (trackExists) {
      const trackVisible = await trackExists.isVisible().catch(() => false);
      console.log(`Track visible: ${trackVisible}`);
      const cardCount = await trackExists.$$eval('a', (links) => links.length).catch(() => 0);
      console.log(`Cards found: ${cardCount}`);
    }
    
    // Check console logs for debug beacon
    const consoleMessages = await page.evaluate(() => {
      return window.console._logs || [];
    }).catch(() => []);
    
    if (consoleMessages.length > 0) {
      console.log('\nConsole messages:');
      consoleMessages.forEach(msg => console.log(`  - ${msg}`));
    }
    
    await browser.close();
    process.exit(1);
  }
}

verifyCarouselVisible();
