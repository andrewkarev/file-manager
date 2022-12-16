import { homedir } from 'node:os';
import { chdir, cwd } from 'node:process';
import { dirname } from 'node:path';
import { printCurrentDir } from '../messages/printCurrentDir.js';

export const goUp = () => {
  const currentDir = cwd();
  const dirToGo = dirname(currentDir);
  const homeDir = homedir();

  if (currentDir !== homeDir && dirToGo !== dirname(homeDir)) {
    chdir(dirToGo);
  }

  printCurrentDir();
};
