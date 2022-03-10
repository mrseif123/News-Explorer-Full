const express = require('express');
const helmet = require('helmet');
const path = require('path');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes/index');
const { errorsHandling } = require('./middlewares/errors');
const { limiter, ERROR_MESSAGES, STATUS_CODES } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, NODE_ENV, SERVER_DB_ADDRESS } = process.env;
const app = express();
const DB_ADDRESS = NODE_ENV === 'production' ? SERVER_DB_ADDRESS : 'mongodb://localhost:27017/newsdb';

const allowedCors = [
  'http://localhost:3000',
  'https://mrseif12.students.nomoreparties.sbs',
  'https://www.mrseif12.students.nomoreparties.sbs',
  'https://api.mrseif12.students.nomoreparties.sbs',
];

mongoose.connect(DB_ADDRESS);

app.use((req, res, next) => {
  const {
    origin,
  } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', '*');
  }
  next();
});

app.use(cors());
app.options('*', cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);
app.use('/', routes);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.status(STATUS_CODES.NOT_FOUND).send({ message: ERROR_MESSAGES.NOT_FOUND });
});

app.use(limiter);
app.use(errors());
app.use(errorLogger);
app.use(errorsHandling);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
