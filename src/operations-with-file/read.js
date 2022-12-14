import { createReadStream } from 'fs';
import { access } from 'fs/promises';
import { OperationFailedError } from '../errors/OperationFailedError.js';
import { printCurrentDir } from '../messages/printCurrentDir.js';

export const read = async ([path]) => {
  try {
    await access(path);

    const stream = createReadStream(path, 'utf-8');
    let streamContent = '';

    stream.on('data', (chunk) => (streamContent += chunk));
    stream.on('end', () => {
      console.log(streamContent + '\n');
      printCurrentDir();
    });
  } catch (error) {
    throw new OperationFailedError('Operation failed');
  }
};
