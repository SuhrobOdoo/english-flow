import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { deflateSync } from 'zlib';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, '..', 'public', 'icons');

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const typeBytes = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const crcInput = Buffer.concat([typeBytes, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(crcInput));
  return Buffer.concat([length, typeBytes, data, crc]);
}

function createPNG(size) {
  // Raw pixel data: RGBA for each pixel, with filter byte per row
  const rawData = Buffer.alloc((size * 4 + 1) * size);
  
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.4;
  
  for (let y = 0; y < size; y++) {
    rawData[y * (size * 4 + 1)] = 0; // No filter
    for (let x = 0; x < size; x++) {
      const offset = y * (size * 4 + 1) + 1 + x * 4;
      
      // Create rounded square with gradient
      const dx = Math.abs(x - cx);
      const dy = Math.abs(y - cy);
      const cornerRadius = size * 0.18;
      const halfSize = size / 2;
      
      let inside = true;
      if (dx > halfSize - cornerRadius && dy > halfSize - cornerRadius) {
        const cdx = dx - (halfSize - cornerRadius);
        const cdy = dy - (halfSize - cornerRadius);
        inside = (cdx * cdx + cdy * cdy) <= cornerRadius * cornerRadius;
      }
      
      if (inside) {
        // Gradient from indigo to violet
        const t = (x + y) / (size * 2);
        const r = Math.round(99 + t * (139 - 99));
        const g = Math.round(102 + t * (92 - 102));
        const b = Math.round(241 + t * (246 - 241));
        
        rawData[offset] = r;
        rawData[offset + 1] = g;
        rawData[offset + 2] = b;
        rawData[offset + 3] = 255;
      } else {
        // Transparent
        rawData[offset] = 0;
        rawData[offset + 1] = 0;
        rawData[offset + 2] = 0;
        rawData[offset + 3] = 0;
      }
    }
  }
  
  // Draw a simple "E" letter using pixel manipulation
  const letterSize = Math.floor(size * 0.5);
  const startX = Math.floor((size - letterSize * 0.5) / 2);
  const startY = Math.floor((size - letterSize) / 2);
  const thickness = Math.max(1, Math.floor(size * 0.08));
  
  // Horizontal bars of "E"
  const bars = [
    [startY, startX - letterSize * 0.15, letterSize * 0.5],  // top
    [startY + letterSize / 2 - thickness / 2, startX - letterSize * 0.15, letterSize * 0.4], // middle
    [startY + letterSize - thickness, startX - letterSize * 0.15, letterSize * 0.5],  // bottom
  ];
  
  // Vertical bar
  for (let dy = 0; dy < letterSize; dy++) {
    for (let dx = 0; dx < thickness; dx++) {
      const px = Math.floor(startX - letterSize * 0.15) + dx;
      const py = startY + dy;
      if (px >= 0 && px < size && py >= 0 && py < size) {
        const offset = py * (size * 4 + 1) + 1 + px * 4;
        rawData[offset] = 255;
        rawData[offset + 1] = 255;
        rawData[offset + 2] = 255;
        rawData[offset + 3] = 255;
      }
    }
  }
  
  for (const [by, bx, bw] of bars) {
    for (let dy = 0; dy < thickness; dy++) {
      for (let dx = 0; dx < bw; dx++) {
        const px = Math.floor(bx + dx);
        const py = Math.floor(by + dy);
        if (px >= 0 && px < size && py >= 0 && py < size) {
          const offset = py * (size * 4 + 1) + 1 + px * 4;
          rawData[offset] = 255;
          rawData[offset + 1] = 255;
          rawData[offset + 2] = 255;
          rawData[offset + 3] = 255;
        }
      }
    }
  }
  
  const compressed = deflateSync(rawData);
  
  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));
  
  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

for (const size of [16, 48, 128]) {
  const png = createPNG(size);
  const filepath = join(iconsDir, `icon${size}.png`);
  writeFileSync(filepath, png);
  console.log(`Created ${filepath} (${png.length} bytes)`);
}
