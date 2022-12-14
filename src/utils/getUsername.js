import { argv } from 'process';

const getUsernameArg = () => {
  const username = argv.filter(
    (arg) => arg.startsWith('--') && arg.includes('username=')
  );

  return username;
};

export const parseUsername = () => {
  const username = getUsernameArg();

  return username.length
    ? username[0].slice(username[0].indexOf('=') + 1)
    : 'User';
};
