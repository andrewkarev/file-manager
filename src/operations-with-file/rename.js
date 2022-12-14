import fs from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { printCurrentDir } from '../messages/printCurrentDir.js';
import { OperationFailedError } from '../errors/OperationFailedError.js';
import { checkIsFileExist } from '../utils/checkIsFileExist.js';
import { cwd } from 'node:process';
import { validateFilename } from '../utils/validateFilename.js';
import { CustomError } from '../errors/CustomError.js';

export const rename = async ([pathToFile, newFilename]) => {
  try {
    if (!newFilename) {
      throw new CustomError('Please, provide a new file name');
    }

    const oldPath = join(cwd(), pathToFile);
    const newPath = join(cwd(), dirname(pathToFile), newFilename);

    if (await checkIsFileExist(newPath)) {
      throw new CustomError('A file with the same name already exists');
    }

    if (!validateFilename(newFilename)) {
      throw new CustomError(
        '"/,|,\\" and white spaces are not allowed in a filename'
      );
    }

    await fs.rename(oldPath, newPath);

    printCurrentDir();
  } catch (error) {
    if (error instanceof CustomError) console.log(error.message);

    throw new OperationFailedError('Operation failed');
  }
};
