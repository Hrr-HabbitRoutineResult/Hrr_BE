export class DataBaseError extends Error {
  errorCode = 'D001';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class DataBaseNotExistError extends Error {
  errorCode = 'D002';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export default {
  DataBaseError,
  DataBaseNotExistError,
};
