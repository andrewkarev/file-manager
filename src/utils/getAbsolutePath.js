import { isAbsolute, join } from 'node:path';
import { cwd } from 'node:process';
import { homedir } from 'node:os';
import { getRootDir } from './getRootDir.js';

export const getAbsolutePath = (path) => {
  const rootDir = getRootDir();

  if (path === rootDir) return homedir();

  const isAbsolutePath = isAbsolute(path);
  const currentDir = cwd();

  return isAbsolutePath ? path : join(currentDir, path);
};
