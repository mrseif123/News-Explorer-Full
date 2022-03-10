const { isCelebrateError } = require('celebrate');
const { STATUS_CODES, ERROR_MESSAGES } = require('../utils/constants');

module.exports.errorsHandling = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    res
      .status(STATUS_CODES.BAD_REQUEST)
      .send({
        message: [...err.details.entries()][0][1].message,
      });
  }
  const {
    statusCode = STATUS_CODES.OK, message,
  } = err;
  res.status(statusCode).send({
    message: statusCode === STATUS_CODES.SERVER_ERROR ? ERROR_MESSAGES.SERVER_ERROR : message,
  });
  next(err);
};
