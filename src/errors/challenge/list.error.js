export class CreateChallengeError extends Error {
  errorCode = 'B001';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 400;
    this.data = data;
  }
}

export class SendChallengeError extends Error {
  errorCode = 'B002';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 400;
    this.data = data;
  }
}

//인증 실패 오류
export class ChallengeExpiredError extends Error {
  errorCode = 'B003';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 400;
    this.data = data;
  }
}

//서버오류
export class DataBaseError extends Error {
  errorCode = 'B004';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 400;
    this.data = data;
  }
}

export class ChallengeIdNotExistsError extends Error {
  errorCode = 'B005';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 400;
    this.data = data;
  }
}

export default {
  CreateChallengeError,
  DataBaseError,
  ChallengeExpiredError,
  SendChallengeError,
  ChallengeIdNotExistsError,
};
