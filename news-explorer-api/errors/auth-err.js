const { STATUS_CODES } = require('../utils/constants');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.UNAUTHORIZED;
  }
}

module.exports = AuthError;
