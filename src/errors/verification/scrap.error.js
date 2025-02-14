export class VerificationAlreadyScrapedError extends Error {
  errorCode = 'S001';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 400;
    this.data = data;
  }
}

export class VerificationNotScrapedError extends Error {
  errorCode = 'S002';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 400;
    this.data = data;
  }
}

export class VerificationScrapsUnderZeroError extends Error {
  errorCode = 'S003';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 400;
    this.data = data;
  }
}

export default {
  VerificationAlreadyScrapedError,
  VerificationNotScrapedError,
  VerificationScrapsUnderZeroError,
};
