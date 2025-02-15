export class BoardPinError extends Error {
  errorCode = 'B001';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 404;
    this.data = data;
  }
}

export class DataBaseError extends Error {
  errorCode = 'B002';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export default {
  BoardPinError,
  DataBaseError,
};
