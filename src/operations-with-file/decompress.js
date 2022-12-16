import { dirname, basename, join } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliDecompress } from 'node:zlib';
import { CustomError } from '../errors/CustomError.js';
import { OperationFailedError } from '../errors/OperationFailedError.js';
import { checkIsFileExist } from '../utils/checkIsFileExist.js';
import { printCurrentDir } from '../messages/printCurrentDir.js';
import { validateFilename } from '../utils/validateFilename.js';
import { InvalidInputError } from '../errors/InvalidInputError.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { isFile } from '../utils/isFile.js';

export const decompress = async ([pathToFile, pathToDestination]) => {
  try {
    if (!pathToFile) {
      throw new InvalidInputError('Please, provide a path to the source file');
    }

    if (!pathToDestination) {
      throw new InvalidInputError(
        'Please, provide the path to save the decompressed file'
      );
    }

    const sourceFilePath = getAbsolutePath(pathToFile);
    const decompressedFileDirPath = getAbsolutePath(dirname(pathToDestination));
    const isSourceFile = await checkIsFileExist(sourceFilePath);
    const isDestinationDir = await checkIsFileExist(decompressedFileDirPath);

    if (!isSourceFile || !isDestinationDir) {
      throw new CustomError(
        'There is no file or directory with the specified name'
      );
    }

    const isPathToFile = await isFile(sourceFilePath);
    if (!isPathToFile) {
      throw new CustomError('Only files can be decompressed');
    }

    const decompressedFileName = basename(pathToDestination);

    const decompressedFilePath = join(
      decompressedFileDirPath,
      decompressedFileName
    );

    if (await checkIsFileExist(decompressedFilePath)) {
      throw new CustomError('A file with the same name already exists');
    }

    if (!validateFilename(decompressedFileName)) {
      throw new CustomError(
        '"/|\\" and white spaces are not allowed in a filename'
      );
    }

    if (!decompressedFileName.endsWith('.br')) {
      throw new CustomError(
        'You can only decompress files compressed with the Brotli algorithm that have the "br" extension'
      );
    }

    const readStream = createReadStream(sourceFilePath);
    const writeStream = createWriteStream(decompressedFilePath);

    const brotli = createBrotliDecompress();

    const stream = readStream.pipe(brotli).pipe(writeStream);

    stream.on('finish', () => {
      console.log('Done decompressing');
      printCurrentDir();
    });
  } catch (error) {
    if (error instanceof CustomError) console.log(error.message);

    if (error instanceof InvalidInputError) {
      console.log(error.message);
      throw new InvalidInputError('Invalid input');
    }

    throw new OperationFailedError('Operation failed');
  }
};
