import { cwd } from 'node:process';

export const printCurrentDir = () =>
  console.log(`\nYou are currently in ${cwd()}`);
