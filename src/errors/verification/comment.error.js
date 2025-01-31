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

export default {
  CommentContentEmtpyError,
  CommentTypeError,
};
