import { join, dirname, basename, extname } from 'node:path';
import { cwd } from 'node:process';
import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliDecompress } from 'node:zlib';
import { CustomError } from '../errors/CustomError.js';
import { OperationFailedError } from '../errors/OperationFailedError.js';
import { checkFile } from '../utils/checkFile.js';
import { checkIsFileExist } from '../utils/checkIsFileExist.js';
import { printCurrentDir } from '../messages/printCurrentDir.js';
import { validateFilename } from '../utils/validateFilename.js';

export const decompress = async ([pathToFile, pathToDestination]) => {
  try {
    if (!pathToFile) {
      throw new CustomError('Please, provide a path to the source file');
    }

    if (!pathToDestination) {
      throw new CustomError(
        'Please, provide the path to save the decompressed file'
      );
    }

    const sourceFilePath = join(cwd(), pathToFile);
    const decompressedDirPath = join(cwd(), dirname(pathToDestination));
    const isSourceFile = await checkIsFileExist(sourceFilePath);
    const isDestinationDir = await checkIsFileExist(decompressedDirPath);

    if (!isSourceFile || !isDestinationDir) {
      throw new CustomError(
        'There is no file or directory with the specified name'
      );
    }

    const filename = basename(sourceFilePath);
    const isFile = await checkFile(sourceFilePath, filename);

    if (!isFile) {
      throw new CustomError('Only files can be decompressed');
    }

    const decompressedFileName = basename(pathToDestination);

    if (await checkIsFileExist(decompressedFileName)) {
      throw new CustomError('A file with the same name already exists');
    }

    if (!validateFilename(decompressedFileName)) {
      throw new CustomError(
        '"/,|,\\" and white spaces are not allowed in a filename'
      );
    }

    const readStream = createReadStream(sourceFilePath);
    const writeStream = createWriteStream(pathToDestination);

    const brotli = createBrotliDecompress();

    const stream = readStream.pipe(brotli).pipe(writeStream);

    stream.on('finish', () => {
      console.log('Done decompressing');
      printCurrentDir();
    });
  } catch (error) {
    if (error instanceof CustomError) console.log(error.message);

    throw new OperationFailedError('Operation failed');
  }
};
