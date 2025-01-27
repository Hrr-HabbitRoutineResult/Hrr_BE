export class BadgeNotExistError extends Error {
  errorCode = 'U001';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 404;
    this.data = data;
  }
}

export class DataBaseError extends Error {
  errorCode = 'U002';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 400;
    this.data = data;
  }
}

export class OngoingChallengeNotExistError extends Error {
  errorCode = 'U003';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 404;
    this.data = data;
  }
}

export class CompletedChallengeNotExistError extends Error {
  errorCode = 'U004';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 404;
    this.data = data;
  }
}

export default {
  BadgeNotExistError,
  DataBaseError,
  OngoingChallengeNotExistError,
  CompletedChallengeNotExistError,
};
