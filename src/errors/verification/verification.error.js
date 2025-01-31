export class VerificationTypeDoesntMatchError extends Error {
  errorCode = 'V001';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 400;
    this.data = data;
  }
}

export default {
  VerificationTypeDoesntMatchError,
};
