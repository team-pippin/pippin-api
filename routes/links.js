const express = require('express'),
  links = require('../controllers/links'),
  router = express.Router({ mergeParams: true });

router.get('/', links.getLinks);
router.post('/', links.createLink)

router.put('/:linkId', links.updateLinkById)
router.delete('/:linkId', links.deleteLinkById);

module.exports = router;