export class UserAlreadyJoinedChallenge extends Error {
  errorCode = 'P001';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 400;
    this.data = data;
  }
}

export class DataBaseError extends Error {
  errorCode = 'P002';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 400;
    this.data = data;
  }
}

export class ChallengeExpiredError extends Error {
  errorCode = 'P003';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 400;
    this.data = data;
  }
}

export default {
  UserAlreadyJoinedChallenge,
  DataBaseError,
  ChallengeExpiredError,
};
