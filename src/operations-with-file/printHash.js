import { createHash } from 'node:crypto';
import { createReadStream } from 'fs';
import { stdout } from 'process';
import { CustomError } from '../errors/CustomError.js';
import { checkIsFileExist } from '../utils/checkIsFileExist.js';
import { printCurrentDir } from '../messages/printCurrentDir.js';
import { InvalidInputError } from '../errors/InvalidInputError.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { isFile } from '../utils/isFile.js';
import { handleError } from '../utils/handleError.js';

export const printHash = async ([path]) => {
  try {
    if (!path) {
      throw new InvalidInputError(
        'Please, provide a path to the file for hashing'
      );
    }

    const pathToFile = getAbsolutePath(path);
    const isPathValid = await checkIsFileExist(pathToFile);

    if (!isPathValid) {
      throw new CustomError('There is no file with the specified name');
    }

    const isPathToFile = await isFile(pathToFile);

    if (!isPathToFile) {
      throw new CustomError('Only files can be hashed');
    }

    const hash = createHash('sha256');
    const input = createReadStream(pathToFile);

    input.pipe(hash).setEncoding('hex').pipe(stdout);

    input.on('end', () => {
      stdout._write('\n');
      printCurrentDir();
    });
  } catch (error) {
    handleError(error);
  }
};
