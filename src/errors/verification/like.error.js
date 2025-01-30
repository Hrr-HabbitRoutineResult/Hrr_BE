export class VerificationAlreadyLikedError extends Error {
  errorCode = 'L001';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 400;
    this.data = data;
  }
}

export default {
  VerificationAlreadyLikedError,
};
