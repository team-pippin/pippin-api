const { Account, School, Article } = require("../models");

exports.getNews = async (request, response) => {
  try {
    const news = await Article.find({
      school: request.params.schoolId
    }).populate("school");
    response.status(200).json(news);
  } catch (error) {
    response.status(500).json(error);
  }
};

exports.createNewsArticle = async (request, response) => {
  try {
    const schoolId = request.params.schoolId;
    const school = await School.findById(schoolId);
    const article = createArticle(school, request);
    await article.save();
    return await this.getNews(request, response);
  } catch (error) {
    response.status(500).json(error);
  }
};

exports.getNewsById = async (request, response) => {
  try {
    const articleId = request.params.articleId;
    const article = await Article.findById(articleId);
    response.status(200).json(article);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

exports.updateNewsById = (request, response) => {};

exports.deleteNewsById = async (request, response) => {
  try {
    const articleId = request.params.articleId;
    await Article.findByIdAndRemove(articleId);
    return await this.getNews(request, response);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

const createArticle = (school, request) => {
  const author = request.user;
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
