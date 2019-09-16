const express = require('express'),
  events = require('../controllers/events'),
  router = express.Router({ mergeParams: true });

router.get('/', events.getEvents);
router.post('/', events.createEvent)

router.get('/:eventId', events.getEventById);
router.put('/:eventId', events.updateEventById)
router.delete('/:eventId', events.deleteEventById);

module.exports = router;