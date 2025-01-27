export class BadgeNotExistError extends Error {
  errorCode = 'U001';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 404;
    this.data = data;
  }
}

export default {
  BadgeNotExistError,
};
