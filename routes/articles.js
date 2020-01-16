const express = require("express"),
  articles = require("../controllers/articles"),
  auth = require("../middleware/auth"),
  router = express.Router({ mergeParams: true });

router.get("/", auth.isAuthenticated, auth.canReadSchool, articles.getNews);
router.get(
  "/:articleId",
  auth.isAuthenticated,
  auth.canReadSchool,
  articles.getNewsById
);

router.post(
  "/",
  auth.isAuthenticated,
  auth.canEditSchool,
  articles.createNewsArticle
);
router.put(
  "/:articleId",
  auth.isAuthenticated,
  auth.canEditSchool,
  articles.updateNewsById
);
router.delete(
  "/:articleId",
  auth.isAuthenticated,
  auth.canEditSchool,
  articles.deleteNewsById
);

module.exports = router;
