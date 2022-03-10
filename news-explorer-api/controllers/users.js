const NotFoundError = require('../errors/not-found-err');
const User = require('../models/user');
const {
  STATUS_CODES, ERROR_MESSAGES,
} = require('../utils/constants');

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .select('+password')
    .then((users) => res.status(STATUS_CODES.OK).send({
      data: users,
    }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user ? req.user._id : '')
    .orFail(new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND))
    .then(({
      email,
      name,
    }) => res.status(STATUS_CODES.OK).send({
      email,
      name,
    }))
    .catch(next);
};
