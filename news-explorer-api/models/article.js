const mongoose = require('mongoose');
const validatorPkg = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
  },
  text: {
    type: String,
    required: true,
    minlength: 2,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  source: {
    type: String,
    required: true,
    minlength: 2,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validatorPkg.isURL(v);
      },
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validatorPkg.isURL(v);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },

});

module.exports = mongoose.model('article', articleSchema);
