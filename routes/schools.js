const express = require('express'),
  school = require('../controllers/schools'),
  links = require('./links'),
  articles = require('./articles'),
  events = require('./events'),
  auth = require('../middleware/auth'),
  router = express.Router();

router.get('/', auth.isAuthenticated, auth.canReadSchool, school.getAllSchools);
router.get('/:schoolId', auth.isAuthenticated, auth.canReadSchool, school.getSchoolById);

router.post('/', auth.isAuthenticated, auth.canEditSchool, school.postNewSchool);
router.put('/:schoolId', auth.isAuthenticated, auth.canEditSchool, school.putSchoolById);

router.use('/:schoolId/articles', articles);
router.use('/:schoolId/links', links);
router.use('/:schoolId/events', events);

module.exports = router;