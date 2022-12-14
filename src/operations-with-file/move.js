import { rm } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { copy } from './copy.js';

export const move = async ([pathToOldFile, pathToNewDir]) => {
  await copy([pathToOldFile, pathToNewDir]);

  const pathTofFile = join(cwd(), pathToOldFile);

  await rm(pathTofFile);
};
