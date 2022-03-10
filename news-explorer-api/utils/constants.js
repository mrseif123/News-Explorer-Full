const rateLimit = require('express-rate-limit');

const {
  NODE_ENV,
  SERVER_DB_ADDRESS,
} = process.env;

module.exports.DB_ADDRESS = NODE_ENV === 'production' ? SERVER_DB_ADDRESS : 'mongodb://localhost:27017/newsdb';

module.exports.DEV_KEY = 'dev-secret';

module.exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports.STATUS_CODES = {
  OK: 200,
  POSTED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

module.exports.ERROR_MESSAGES = {
  NOT_FOUND: 'Requested resource not found.',
  UNAUTHORIZED: 'Authorization Required',
  SERVER_ERROR: 'An error has occured on the server.',
  ARTICLE_BAD_REQUEST: 'Data validation failed.',
  ARTICLE_NOT_FOUND: 'Article not found.',
  DELET_ARTICLE_BAD_REQUEST: 'You can only delete your own articles.',
  SIGNIN: 'Incorrect email or password.',
  SIGNUP: 'Unable to create a user with the credentials provided.',
  USER_NOT_FOUND: 'User not found.',
};
