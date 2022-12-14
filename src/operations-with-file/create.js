import { open } from 'node:fs/promises';
import { printCurrentDir } from '../messages/printCurrentDir.js';
import { OperationFailedError } from '../errors/OperationFailedError.js';
import { validateFilename } from '../utils/validateFilename.js';
import { CustomError } from '../errors/CustomError.js';

export const create = async ([filename]) => {
  try {
    if (!filename) console.log('Please, provide a file name');

    if (!validateFilename(filename)) {
      throw new CustomError(
        '"/,|,\\" and white spaces are not allowed in a filename'
      );
    }

    const file = await open(filename, 'ax');
    await file.close();

    printCurrentDir();
  } catch (error) {
    if (error instanceof CustomError) console.log(error.message);

    if (error.code === 'EEXIST') {
      console.log('A file with the same name already exists');
    }

    throw new OperationFailedError('Operation failed');
  }
};
