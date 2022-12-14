import { readdir } from 'node:fs/promises';
import { cwd } from 'node:process';
import { sortAscending } from '../utils/sortAscending.js';
import { OperationFailedError } from '../errors/OperationFailedError.js';
import { printCurrentDir } from '../messages/printCurrentDir.js';

export const printDirItems = async () => {
  try {
    const currentDir = cwd();
    const items = await readdir(currentDir, { withFileTypes: true });
    const folders = [];
    const files = [];

    items.forEach((item) => {
      const element = {
        name: item.name,
        type: item.isFile() ? 'file' : 'directory',
      };

      item.isFile() ? files.push(element) : folders.push(element);
    });

    console.table([...sortAscending(folders), ...sortAscending(files)]);
    printCurrentDir();
  } catch (error) {
    throw new OperationFailedError('Operation failed');
  }
};
