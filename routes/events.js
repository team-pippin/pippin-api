const express = require('express'),
  events = require('../controllers/events'),
  auth = require('../middleware/auth'),
  router = express.Router({ mergeParams: true });

router.get('/', auth.canReadSchool, events.getEvents);
router.post('/', auth.canEditSchool, events.createEvent)

router.get('/:eventId', auth.canReadSchool, events.getEventById);
router.put('/:eventId', auth.canEditSchool, events.updateEventById)
router.delete('/:eventId', auth.canEditSchool, events.deleteEventById);

module.exports = router;