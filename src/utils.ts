export class UnknownError extends Error {
  constructor(error: unknown, message: string) {
    if (error instanceof Error) {
      super(error.message);
    } else if (typeof error === 'string') {
      super(error);
    } else {
      super(message);
    }
    this.name = 'UnknownError';
  }
}