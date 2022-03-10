const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const BadRequestError = require('../errors/bad-request-err');
const AuthError = require('../errors/auth-err');
const ConflictError = require('../errors/conflict-err');

const User = require('../models/user');
const {
  ERROR_MESSAGES,
  STATUS_CODES,
  DEV_KEY,
} = require('../utils/constants');

dotenv.config();
const {
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => res.status(STATUS_CODES.POSTED).send({
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' || err.code === 11000) {
        throw new ConflictError(ERROR_MESSAGES.SIGNUP);
      } else if (err.name === 'ValidationError') {
        throw new BadRequestError(ERROR_MESSAGES.SIGNIN);
      }
      next(err);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;
  User.findOne({
    email,
  })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(ERROR_MESSAGES.SIGNIN);
      } else {
        req._id = user._id;
        return bcrypt.compare(password, user.password);
      }
    })
    .then((matched) => {
      if (!matched) {
        throw new AuthError(ERROR_MESSAGES.SIGNIN);
      }
      const token = jwt.sign({ _id: req._id }, NODE_ENV === 'production' ? JWT_SECRET : DEV_KEY, { expiresIn: '7d' });
      res.header('authorization', `Bearer ${token}`);
      res.cookie('token', token, {
        httpOnly: true,
      });
      res.status(STATUS_CODES.OK).send({
        token,
      });
    })
    .catch(next);
};
