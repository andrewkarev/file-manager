import { chdir } from 'node:process';
import { homedir } from 'node:os';
import { dirname } from 'node:path';
import { InvalidInputError } from '../errors/InvalidInputError.js';
import { printCurrentDir } from '../messages/printCurrentDir.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { handleError } from '../utils/handleError.js';

export const goTo = ([path]) => {
  try {
    if (!path) {
      throw new InvalidInputError('Please, provide a path to change directory');
    }

    const homeDir = homedir();
    const pathToGo = getAbsolutePath(path);
    const isRootDir = pathToGo.toLowerCase() === dirname(homeDir).toLowerCase();

    isRootDir ? chdir(homeDir) : chdir(pathToGo);

    printCurrentDir();
  } catch (error) {
    handleError(error);
  }
};
