import { chdir } from 'node:process';
import { OperationFailedError } from '../errors/OperationFailedError.js';
import { printCurrentDir } from '../messages/printCurrentDir.js';

export const goTo = ([path]) => {
  try {
    chdir(path);
    printCurrentDir();
  } catch (error) {
    throw new OperationFailedError('Operation failed');
  }
};
