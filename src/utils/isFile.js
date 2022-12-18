import { readdir } from 'node:fs/promises';
import { dirname, basename } from 'node:path';

export const isFile = async (path) => {
  const filename = basename(path);
  const files = await readdir(dirname(path), {
    withFileTypes: true,
  });

  return files
    .find((file) => file.name.toLowerCase() === filename.toLowerCase())
    .isFile();
};
