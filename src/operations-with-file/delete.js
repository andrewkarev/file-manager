import { rm } from 'node:fs/promises';
import { OperationFailedError } from '../errors/OperationFailedError.js';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { printCurrentDir } from '../messages/printCurrentDir.js';

export const remove = async ([path]) => {
  try {
    const pathTofFile = join(cwd(), path);

    await rm(pathTofFile);

    printCurrentDir();
  } catch (error) {
    throw new OperationFailedError('Operation failed');
  }
};
