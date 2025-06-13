export class ClientError extends Error {
  constructor(message, status = 400) {
    super(message), (this.statusCode = status);
  }
}

export class ServerError extends Error {
  constructor(message, status = 500) {
    super(message), (this.statusCode = status);
  }
}
