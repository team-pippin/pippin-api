const express = require('express'),
  school = require('../controllers/schools'),
  links = require('./links'),
  articles = require('./articles'),
  events = require('./events'),
  auth = require('../middleware/auth'),
  router = express.Router();

router.get('/', auth.canReadSchool, school.getAllSchools);
router.post('/', auth.canEditSchool, school.postNewSchool);

router.get('/:schoolId', auth.canReadSchool, school.getSchoolById);
router.put('/:schoolId', school.putSchoolById);

router.use('/:schoolId/articles', articles);
router.use('/:schoolId/links', links);
router.use('/:schoolId/events', events);

module.exports = router;