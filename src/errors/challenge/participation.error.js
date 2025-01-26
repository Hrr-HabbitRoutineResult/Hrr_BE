export class DataBaseError extends Error {
  errorCode = 'P002';
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
