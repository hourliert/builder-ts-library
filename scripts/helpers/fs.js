import fs from 'fs';

export function readFile(src) {
  return new Promise((resolve, reject) => {
    fs.readFile(src, 'utf8', (readErr, data) => {
      if (readErr) reject(readErr);
      resolve(data);
    });
  });
}

export function writeFile(src, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(src, data, 'utf8', writeErr => {
      if (writeErr) reject(writeErr);
      resolve();
    });
  });
}
