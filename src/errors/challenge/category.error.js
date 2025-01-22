export class AccessTokenError extends Error {
  errorCode = 'C001';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 401;
    this.data = data;
  }
}

export class DataBaseError extends Error {
  errorCode = 'C002';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 400;
    this.data = data;
  }
}

export default {
  AccessTokenError,
  DataBaseError,
};
