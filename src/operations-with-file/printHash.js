import { createHash } from 'node:crypto';
import { createReadStream } from 'fs';
import { stdout } from 'process';
import { join, basename } from 'node:path';
import { cwd } from 'node:process';
import { CustomError } from '../errors/CustomError.js';
import { OperationFailedError } from '../errors/OperationFailedError.js';
import { checkIsFileExist } from '../utils/checkIsFileExist.js';
import { checkFile } from '../utils/checkFile.js';
import { printCurrentDir } from '../messages/printCurrentDir.js';

export const printHash = async ([path]) => {
  try {
    if (!path) {
      throw new CustomError('Please, provide a path to the file for hashing');
    }

    const pathToFile = join(cwd(), path);
    const isPathValid = await checkIsFileExist(pathToFile);

    if (!isPathValid) {
      throw new CustomError('There is no file with the specified name');
    }

    const filename = basename(pathToFile);
    const isFile = await checkFile(pathToFile, filename);

    if (!isFile) {
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
    if (error instanceof CustomError) console.log(error.message);

    throw new OperationFailedError('Operation failed');
  }
};
