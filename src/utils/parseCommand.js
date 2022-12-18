import { InvalidInputError } from '../errors/InvalidInputError.js';

export const parseCommand = (input = null) => {
  if (!input) throw new InvalidInputError('Invalid input');

  const [command, ...args] = input.split(' ');
  const regex =
    /^(.exit|up|cd|ls|cat|add|rn|cp|mv|rm|os|hash|compress|decompress)$/;

  if (!command.match(regex)) throw new InvalidInputError('Invalid input');

  return [command, ...args];
};
