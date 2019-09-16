const express = require('express'),
  articles = require('../controllers/articles'),
  router = express.Router({ mergeParams: true })

router.get('/', articles.getNews);
router.post('/', articles.createNewsArticle)

router.get('/:newsId', articles.getNewsById);
router.put('/:newsId', articles.updateNewsById)
router.delete('/:newsId', articles.deleteNewsById);

module.exports = router;