const Article = require('../models/article');
// const BadRequestError = require('../errors/bad-request-err');
const AuthError = require('../errors/auth-err');
const ServerError = require('../errors/server-err');
const NotFoundError = require('../errors/not-found-err');
const { STATUS_CODES, ERROR_MESSAGES } = require('../utils/constants');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.status(STATUS_CODES.OK).send(articles))
    .catch(() => {
      throw new ServerError(ERROR_MESSAGES.SERVER_ERROR);
    })
    .catch(next);
};
module.exports.addArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((article) => res.status(STATUS_CODES.OK).send(article))
    // .catch((err) => {
    //   if (err.name === 'ValidationError') {
    //     throw new BadRequestError(ERROR_MESSAGES.ARTICLE_BAD_REQUEST);
    //   }
    // })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .select('+owner')
    .then((article) => {
      if (article && req.user._id.toString() === article.owner.toString()) {
        Article.deleteOne(article).then((deletedArticle) => {
          res.status(STATUS_CODES.OK).send(deletedArticle);
        });
      } else if (!article) {
        throw new NotFoundError(ERROR_MESSAGES.ARTICLE_NOT_FOUND);
      } else {
        throw new AuthError(ERROR_MESSAGES.DELET_ARTICLE_BAD_REQUEST);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.statusCode === 404) {
        throw new NotFoundError(ERROR_MESSAGES.ARTICLE_NOT_FOUND);
      }
      next(err);
    })
    .catch(next);
};
