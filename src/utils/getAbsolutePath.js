import { isAbsolute, join } from 'node:path';
import { cwd } from 'node:process';

export const getAbsolutePath = (path) => {
  const isAbsolutePath = isAbsolute(path);
  const currentDir = cwd();

  return isAbsolutePath ? path : join(currentDir, path);
};
