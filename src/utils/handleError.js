import { CustomError } from '../errors/CustomError.js';
import { InvalidInputError } from '../errors/InvalidInputError.js';
import { OperationFailedError } from '../errors/OperationFailedError.js';

export const handleError = (error) => {
  if (error instanceof InvalidInputError) {
    console.log(error.message);
    throw new InvalidInputError('Invalid input');
  }

  if (error instanceof CustomError) {
    console.log(error.message);
  }

  throw new OperationFailedError('Operation failed');
};
