import { basename, join } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { cwd } from 'node:process';
import { OperationFailedError } from '../errors/OperationFailedError.js';
import { checkIsFileExist } from '../utils/checkIsFileExist.js';
import { printCurrentDir } from '../messages/printCurrentDir.js';
import { CustomError } from '../errors/CustomError.js';
import { checkFile } from '../utils/checkFile.js';

export const copy = async ([pathToOldFile, pathToNewDir]) => {
  try {
    if (!pathToOldFile) {
      throw new CustomError('Please, provide a path to the directory');
    }

    if (!pathToNewDir) {
      throw new CustomError('Please, provide a path to the new directory');
    }

    const oldPath = join(cwd(), pathToOldFile);
    const newDirPath = join(cwd(), pathToNewDir);
    const isOldPathValid = await checkIsFileExist(oldPath);
    const isNewPathValid = await checkIsFileExist(newDirPath);

    if (!isOldPathValid || !isNewPathValid) {
      throw new CustomError(
        'There is no file or directory with the specified name'
      );
    }

    const filename = basename(oldPath);
    const newPath = join(newDirPath, filename);
    const isFile = await checkFile(oldPath, filename);

    if (!isFile) {
      throw new CustomError('Only files can be copied');
    }

    if (await checkIsFileExist(newPath)) {
      throw new CustomError('A file with the same name already exists');
    }

    const readStream = createReadStream(oldPath);
    const writeStream = createWriteStream(newPath);

    readStream.pipe(writeStream);

    printCurrentDir();
  } catch (error) {
    if (error instanceof CustomError) console.log(error.message);

    throw new OperationFailedError('Operation failed');
  }
};
