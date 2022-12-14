import { readdir } from 'node:fs/promises';
import { dirname } from 'node:path';

export const checkFile = async (path, filename) => {
  const files = await readdir(dirname(path), {
    withFileTypes: true,
  });

  return files
    .find((file) => file.name.toLowerCase() === filename.toLowerCase())
    .isFile();
};
