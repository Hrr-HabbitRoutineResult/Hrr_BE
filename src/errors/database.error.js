export class DataBaseError extends Error {
  errorCode = 'D001';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 400;
    this.data = data;
  }
}

export default {
  DataBaseError,
};
