export class CategoryFoundError extends Error {
  errorCode = 'C001';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class DataBaseError extends Error {
  errorCode = 'C002';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class SendCategoryError extends Error {
  errorCode = 'C003';
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export default {
  DataBaseError,
  CategoryFoundError,
  SendCategoryError,
};
