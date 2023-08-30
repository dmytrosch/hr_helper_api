class InvalidParamError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.status = 404
  }
}

export { InvalidParamError, NotFoundError }