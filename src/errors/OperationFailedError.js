export class OperationFailedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'OperationFailedError';
  }
}
