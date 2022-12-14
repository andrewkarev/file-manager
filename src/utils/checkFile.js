import { readdir } from 'node:fs/promises';
import { dirname } from 'node:path';

export const checkFile = async (oldPath, filename) => {
  const files = await readdir(dirname(oldPath), {
    withFileTypes: true,
  });

  return files
    .find((file) => file.name.toLowerCase() === filename.toLowerCase())
    .isFile();
};
