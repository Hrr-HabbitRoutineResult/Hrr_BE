export class CommentContentEmtpyError extends Error {
  errorCode = 'C001';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 400;
    this.data = data;
  }
}

export class CommentTypeError extends Error {
  errorCode = 'C002';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 400;
    this.data = data;
  }
}

export class CommentIdError extends Error {
  errorCode = 'C003';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 400;
    this.data = data;
  }
}

export class CommentContentEmptyError extends Error {
  errorCode = 'C004';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 400;
    this.data = data;
  }
}

export class CommentUpdatePermissionDeniedError extends Error {
  errorCode = 'C005';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 403;
    this.data = data;
  }
}

export class CommentNotExistsError extends Error {
  errorCode = 'C006';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 403;
    this.data = data;
  }
}

export default {
  CommentContentEmtpyError,
  CommentTypeError,
  CommentIdError,
  CommentContentEmptyError,
  CommentUpdatePermissionDeniedError,
  CommentNotExistsError,
};
