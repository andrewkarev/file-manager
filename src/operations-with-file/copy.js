import { basename, join } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { checkIsFileExist } from '../utils/checkIsFileExist.js';
import { printCurrentDir } from '../messages/printCurrentDir.js';
import { CustomError } from '../errors/CustomError.js';
import { InvalidInputError } from '../errors/InvalidInputError.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { isFile } from '../utils/isFile.js';
import { handleError } from '../utils/handleError.js';

export const copy = async ([pathToOldFile, pathToNewDir]) => {
  try {
    if (!pathToOldFile) {
      throw new InvalidInputError('Please, provide a path to the directory');
    }

    if (!pathToNewDir) {
      throw new InvalidInputError(
        'Please, provide a path to the new directory'
      );
    }

    const pathToSource = getAbsolutePath(pathToOldFile);
    const pathToDestinationDir = getAbsolutePath(pathToNewDir);
    const isOldPathValid = await checkIsFileExist(pathToSource);
    const isNewPathValid = await checkIsFileExist(pathToDestinationDir);

    if (!isOldPathValid || !isNewPathValid) {
      throw new CustomError(
        'There is no file or directory with the specified name'
      );
    }

    const filename = basename(pathToSource);
    const newPath = join(pathToDestinationDir, filename);
    const isPathToFile = await isFile(pathToSource);

    if (!isPathToFile) {
      throw new CustomError('Only files can be copied');
    }

    if (await checkIsFileExist(newPath)) {
      throw new CustomError('A file with the same name already exists');
    }

    const readStream = createReadStream(pathToSource);
    const writeStream = createWriteStream(newPath);

    readStream.pipe(writeStream);

    printCurrentDir();
  } catch (error) {
    handleError(error);
  }
};
