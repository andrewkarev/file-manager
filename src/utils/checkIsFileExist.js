import { access } from 'node:fs/promises';

export const checkIsFileExist = async (path) => {
  try {
    await access(path);
    return true;
  } catch (error) {
    return false;
  }
};
