export class BadgeNotExistError extends Error {
  errorCode = 'U001';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 404;
    this.data = data;
  }
}

export class NotFollowingUserError extends Error {
  errorCode = 'P2025';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 404;
    this.data = data;
  }
}

export class DataBaseError extends Error {
  errorCode = 'U003';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 400;
    this.data = data;
  }
}

export default {
  BadgeNotExistError,
  NotFollowingUserError,
  DataBaseError,
};
