import { rm } from 'node:fs/promises';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { copy } from './copy.js';

export const move = async ([pathToOldFile, pathToNewDir]) => {
  await copy([pathToOldFile, pathToNewDir]);

  const pathToFileToDelete = getAbsolutePath(pathToOldFile);

  await rm(pathToFileToDelete);
};
