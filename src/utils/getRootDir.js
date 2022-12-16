import { homedir } from 'node:os';
import { dirname } from 'node:path';

export const getRootDir = () => {
  return dirname(dirname(homedir()));
};
