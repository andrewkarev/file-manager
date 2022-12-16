import fs from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { printCurrentDir } from '../messages/printCurrentDir.js';
import { checkIsFileExist } from '../utils/checkIsFileExist.js';
import { validateFilename } from '../utils/validateFilename.js';
import { CustomError } from '../errors/CustomError.js';
import { InvalidInputError } from '../errors/InvalidInputError.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { isFile } from '../utils/isFile.js';
import { handleError } from '../utils/handleError.js';

export const rename = async ([pathToFile, newFilename]) => {
  try {
    if (!pathToFile) {
      throw new InvalidInputError('Please, provide a path to the file name');
    }

    if (!newFilename) {
      throw new InvalidInputError('Please, provide a new file name');
    }

    const pathToSourceFile = getAbsolutePath(pathToFile);
    const pathToRenamedFile = join(dirname(pathToSourceFile), newFilename);
    const isPathToFile = await isFile(pathToSourceFile);

    if (!isPathToFile) {
      throw new CustomError('Only files can be renamed');
    }

    if (await checkIsFileExist(pathToRenamedFile)) {
      throw new CustomError('A file with the same name already exists');
    }

    if (!validateFilename(newFilename)) {
      throw new CustomError(
        '"/|\\" and white spaces are not allowed in a filename'
      );
    }

    await fs.rename(pathToSourceFile, pathToRenamedFile);

    printCurrentDir();
  } catch (error) {
    handleError(error);
  }
};
