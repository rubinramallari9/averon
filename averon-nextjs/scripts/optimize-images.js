/**
 * Image Optimization Script
 * Converts PNG/JPG images to WebP and AVIF formats
 * Automatically generates responsive sizes
 *
 * Usage: node scripts/optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const INPUT_DIR = path.join(__dirname, '../public/images');


const OUTPUT_DIR = path.join(__dirname, '../public/images/optimized');
const SIZES = [640, 750, 828, 1080, 1200, 1920]; // Responsive breakpoints
const FORMATS = ['webp', 'avif'];

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Get all image files from a directory
 */
function getImageFiles(dir) {
  const files = fs.readdirSync(dir);
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.png', '.jpg', '.jpeg'].includes(ext);
  });
}

/**
 * Optimize a single image
 */
async function optimizeImage(inputPath, filename) {
  const nameWithoutExt = path.parse(filename).name;
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  console.log(`\n📸 Processing: ${filename}`);
  console.log(`   Original size: ${metadata.width}x${metadata.height}`);

  // Generate responsive sizes
  for (const size of SIZES) {
    // Skip if original is smaller than target size
    if (metadata.width < size) continue;

    for (const format of FORMATS) {
      const outputFilename = `${nameWithoutExt}-${size}w.${format}`;
      const outputPath = path.join(OUTPUT_DIR, outputFilename);

      try {
        await image
          .clone()
          .resize(size, null, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .toFormat(format, {
            quality: format === 'avif' ? 60 : 80,
            effort: 6, // Higher effort = better compression (slower)
          })
          .toFile(outputPath);

        const stats = fs.statSync(outputPath);
        const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
        console.log(`   ✓ Created: ${outputFilename} (${sizeMB}MB)`);
      } catch (error) {
        console.error(`   ✗ Error creating ${outputFilename}:`, error.message);
      }
    }
  }

  // Also create a default optimized version (original size)
  for (const format of FORMATS) {
    const outputFilename = `${nameWithoutExt}.${format}`;
    const outputPath = path.join(OUTPUT_DIR, outputFilename);

    try {
      await image
        .clone()
        .toFormat(format, {
          quality: format === 'avif' ? 60 : 80,
          effort: 6,
        })
        .toFile(outputPath);

      const stats = fs.statSync(outputPath);
      const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
      console.log(`   ✓ Created: ${outputFilename} (${sizeMB}MB)`);
    } catch (error) {
      console.error(`   ✗ Error creating ${outputFilename}:`, error.message);
    }
  }
}

/**
 * Calculate total size of directory
 */
function getDirectorySize(dir) {
  const files = fs.readdirSync(dir);
  let totalSize = 0;

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      totalSize += stats.size;
    }
  });

  return totalSize;
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting image optimization...\n');
  console.log(`Input directory: ${INPUT_DIR}`);
  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log(`Formats: ${FORMATS.join(', ')}`);
  console.log(`Responsive sizes: ${SIZES.join(', ')}px\n`);

  // Get original size
  const originalSize = getDirectorySize(INPUT_DIR);
  console.log(`📊 Original images total size: ${(originalSize / 1024 / 1024).toFixed(2)}MB\n`);

  // Get all images
  const images = getImageFiles(INPUT_DIR);

  if (images.length === 0) {
    console.log('⚠️  No images found in input directory');
    return;
  }

  console.log(`Found ${images.length} image(s) to optimize\n`);
  console.log('─'.repeat(60));

  // Process each image
  for (const image of images) {
    const inputPath = path.join(INPUT_DIR, image);
    await optimizeImage(inputPath, image);
  }

  // Calculate savings
  console.log('\n' + '─'.repeat(60));
  const optimizedSize = getDirectorySize(OUTPUT_DIR);
  const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

  console.log('\n✅ Optimization complete!\n');
  console.log(`📊 Results:`);
  console.log(`   Original size:  ${(originalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`   Optimized size: ${(optimizedSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`   Savings:        ${savings}%`);
  console.log(`\n💡 Next steps:`);
  console.log(`   1. Update your <img> tags to use Next.js <Image> component`);
  console.log(`   2. Point src to /images/optimized/your-image.webp`);
  console.log(`   3. Add width and height attributes for better CLS`);
  console.log(`   4. Mark above-the-fold images with priority={true}\n`);
}

// Run the script
main().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
