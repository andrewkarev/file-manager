import { open } from 'node:fs/promises';
import { printCurrentDir } from '../messages/printCurrentDir.js';
import { OperationFailedError } from '../errors/OperationFailedError.js';
import { validateFilename } from '../utils/validateFilename.js';
import { CustomError } from '../errors/CustomError.js';
import { InvalidInputError } from '../errors/InvalidInputError.js';

export const create = async ([filename]) => {
  try {
    if (!filename) {
      throw new InvalidInputError('Please, provide a file name');
    }

    const isValidFilename = validateFilename(filename);

    if (!isValidFilename) {
      throw new CustomError(
        '"/|\\" and white spaces are not allowed in a filename'
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

    if (error instanceof InvalidInputError) {
      console.log(error.message);
      throw new InvalidInputError('Invalid input');
    }

    throw new OperationFailedError('Operation failed');
  }
};
