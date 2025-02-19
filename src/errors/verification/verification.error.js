export class VerificationTypeDoesntMatchError extends Error {
  errorCode = 'V001';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class VerificationNotExistsError extends Error {
  errorCode = 'V002';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export default {
  VerificationTypeDoesntMatchError,
  VerificationNotExistsError,
};
