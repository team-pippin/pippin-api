const { Account, School, Article } = require("../models");

exports.getNews = (request, response) => {
  Article.find({ school: request.params.schoolId })
    .populate("school")
    .then(news => {
      response.status(200).json(news);
    })
    .catch(error => {
      console.log(error);
      response.status(500).json(error);
    });
};

exports.createNewsArticle = (request, response) => {
  let userId = request.user.id; // User Token
  let schoolId = request.params.schoolId;
  let author;

  Account.findById(userId)
    .then(account => {
      author = account;
      return School.findById(schoolId);
    })
    .then(school => {
      let article = createArticle(author, school, request);
      return article.save();
    })
    .then(() => {
      return this.getNews(request, response);
    })
    .catch(error => {
      console.log(error);
      response.status(500).json(error);
    });
};

exports.getNewsById = (request, response) => {
  let articleId = request.params.articleId;
  Article.findById(articleId)
    .then(article => {
      response.status(200).json(article);
    })
    .catch(error => {
      console.log(error);
      response.status(500).json(error);
    });
};

exports.updateNewsById = (request, response) => {};

exports.deleteNewsById = (request, response) => {
  let articleId = request.params.articleId;
  Article.findByIdAndRemove(articleId)
    .then(() => {
      return this.getNews(request, response);
    })
    .catch(error => {
      console.log(error);
      response.status(500).json(error);
    });
};

const createArticle = (author, school, request) => {
  const { imgUrl, sourceUrl, body, subtitle, title } = request.body;

  let article = new Article({
    imgUrl,
    sourceUrl,
    body,
    subtitle,
    title,
    author,
    school
  });

  return article;
};

module.exports = exports;
