export class VerificationAlreadyLikedError extends Error {
  errorCode = 'L001';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 400;
    this.data = data;
  }
}

export class VerificationNotLikedError extends Error {
  errorCode = 'L002';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 400;
    this.data = data;
  }
}

export class VerificationLikesUnderZeroError extends Error {
  errorCode = 'L003';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 400;
    this.data = data;
  }
}

export default {
  VerificationAlreadyLikedError,
  VerificationNotLikedError,
  VerificationLikesUnderZeroError,
};
