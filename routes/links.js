const express = require('express'),
  links = require('../controllers/links'),
  auth = require('../middleware/auth'),
  router = express.Router({ mergeParams: true });

router.get('/', auth.isAuthenticated, auth.canReadSchool, links.getLinks);
router.post('/', auth.isAuthenticated, auth.canEditSchool,links.createLink)

router.put('/:linkId', auth.isAuthenticated, auth.canEditSchool, links.updateLinkById)
router.delete('/:linkId', auth.isAuthenticated, auth.canEditSchool, links.deleteLinkById);

module.exports = router;