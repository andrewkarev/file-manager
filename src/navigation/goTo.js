import { chdir } from 'node:process';
import { homedir } from 'node:os';
import { dirname } from 'node:path';
import { CustomError } from '../errors/CustomError.js';
import { InvalidInputError } from '../errors/InvalidInputError.js';
import { OperationFailedError } from '../errors/OperationFailedError.js';
import { printCurrentDir } from '../messages/printCurrentDir.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';

export const goTo = ([path]) => {
  try {
    if (!path) {
      throw new CustomError('Please, provide a path to change directory');
    }

    const homeDir = homedir();
    const pathToGo = getAbsolutePath(path);
    const isRootDir = pathToGo.toLowerCase() === dirname(homeDir).toLowerCase();

    isRootDir ? chdir(homeDir) : chdir(pathToGo);

    printCurrentDir();
  } catch (error) {
    if (error instanceof CustomError) {
      console.log(error.message);
      throw new InvalidInputError('Invalid input');
    }

    throw new OperationFailedError('Operation failed');
  }
};
