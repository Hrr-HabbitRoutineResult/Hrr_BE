export class UserNotExistError extends Error {
  errorCode = 'A001';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 400;
    this.data = data;
  }
}

export class PasswordMismatchError extends Error {
  errorCode = 'A002';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 401;
    this.data = data;
  }
}

export class TokenExpiredError extends Error {
  errorCode = 'A003';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 403;
    this.data = data;
  }
}

export class RefreshTokenError extends Error {
  errorCode = 'A004';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 403;
    this.data = data;
  }
}

export class AccessTokenError extends Error {
  errorCode = 'A005';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 401;
    this.data = data;
  }
}

export class InvalidTokenError extends Error {
  errorCode = 'A006';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 403;
    this.data = data;
  }
}

export class RefreshTokenMissingError extends Error {
  errorCode = 'A007';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statuscode = 401;
    this.data = data;
  }
}

export class MissingAuthorizationHeader extends Error {
  errorCode = 'A008';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class InvalidAuthorizationFormat extends Error {
  errorCode = 'A009';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 401;
    this.data = data;
  }
}

export class KakaoLoginError extends Error {
  errorCode = 'A010';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 500;
    this.data = data;
  }
}

export default {
  UserNotExistError,
  PasswordMismatchError,
  TokenExpiredError,
  RefreshTokenError,
  AccessTokenError,
  InvalidTokenError,
  RefreshTokenMissingError,
  MissingAuthorizationHeader,
  InvalidAuthorizationFormat,
  KakaoLoginError,
};
