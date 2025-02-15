export class BadgeNotExistError extends Error {
  errorCode = 'U001';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 404;
    this.data = data;
  }
}

export class CannotFollowSelfError extends Error {
  errorCode = 'U002';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class DataBaseError extends Error {
  errorCode = 'U003';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class UserNotExistError extends Error {
  errorCode = 'P2025';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 404;
    this.data = data;
  }
}

export class FollowedUserError extends Error {
  errorCode = 'P2002';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 409;
    this.data = data;
  }
}

export class NotFollowingUserError extends Error {
  errorCode = 'U004';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 404;
    this.data = data;
  }
}

export class UserAlreadyBlockedError extends Error {
  errorCode = 'U005';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export default {
  BadgeNotExistError,
  CannotFollowSelfError,
  DataBaseError,
  UserNotExistError,
  FollowedUserError,
  NotFollowingUserError,
  UserAlreadyBlockedError,
};
