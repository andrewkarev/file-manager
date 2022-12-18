import { rm } from 'node:fs/promises';
import { printCurrentDir } from '../messages/printCurrentDir.js';
import { InvalidInputError } from '../errors/InvalidInputError.js';
import { CustomError } from '../errors/CustomError.js';
import { isFile } from '../utils/isFile.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { handleError } from '../utils/handleError.js';

export const remove = async ([path]) => {
  try {
    if (!path) {
      throw new InvalidInputError('Please, provide a path to the file');
    }

    const isPathToFile = await isFile(path);

    if (!isPathToFile) {
      throw new CustomError('Only files can be deleted');
    }

    const pathTofFile = getAbsolutePath(path);

    await rm(pathTofFile);

    printCurrentDir();
  } catch (error) {
    handleError(error);
  }
};
