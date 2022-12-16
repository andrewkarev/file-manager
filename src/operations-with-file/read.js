import { createReadStream } from 'fs';
import { access } from 'fs/promises';
import { CustomError } from '../errors/CustomError.js';
import { InvalidInputError } from '../errors/InvalidInputError.js';
import { printCurrentDir } from '../messages/printCurrentDir.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { isFile } from '../utils/isFile.js';
import { stdout } from 'node:process';
import { handleError } from '../utils/handleError.js';

export const read = async ([path]) => {
  try {
    if (!path) {
      throw new InvalidInputError('Please, provide a path to the file');
    }

    const pathToRead = getAbsolutePath(path);

    await access(pathToRead);

    const isPathToFile = await isFile(pathToRead);

    if (!isPathToFile) {
      throw new CustomError('Only files can be read');
    }

    const readStream = createReadStream(pathToRead, 'utf-8');
    readStream.pipe(stdout);

    readStream.on('end', () => {
      stdout._write('\n');
      printCurrentDir();
    });
  } catch (error) {
    handleError(error);
  }
};
