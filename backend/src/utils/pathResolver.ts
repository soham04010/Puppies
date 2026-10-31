import path from 'path';
import fs from 'fs';

export const resolveDataPath = (filename: string): string => {
  const candidates = [
    path.join(__dirname, '../data', filename),
    path.join(__dirname, '../../src/data', filename),
    path.join(process.cwd(), 'dist/data', filename),
    path.join(process.cwd(), 'src/data', filename),
    path.join(process.cwd(), 'data', filename)
  ];

  for (const p of candidates) {
    if (fs.existsSync(p)) {
      return p;
    }
  }

  // fallback
  return candidates[0];
};
