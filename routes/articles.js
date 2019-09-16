const express = require('express'),
  articles = require('../controllers/articles'),
  auth = require('../middleware/auth'),
  router = express.Router({ mergeParams: true })

router.get('/', auth.canReadSchool, articles.getNews);
router.post('/', auth.canEditSchool, articles.createNewsArticle)

router.get('/:articleId', auth.canReadSchool, articles.getNewsById);
router.put('/:articleId', auth.canEditSchool, articles.updateNewsById)
router.delete('/:articleId', auth.canEditSchool, articles.deleteNewsById);

module.exports = router;