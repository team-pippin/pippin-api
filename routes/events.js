const express = require("express"),
  events = require("../controllers/events"),
  auth = require("../middleware/auth"),
  router = express.Router({ mergeParams: true });

router.get("/", auth.isAuthenticated, auth.canReadSchool, events.getEvents);
router.get(
  "/:eventId",
  auth.isAuthenticated,
  auth.canReadSchool,
  events.getEventById
);

router.post("/", auth.isAuthenticated, auth.canEditSchool, events.createEvent);
router.put(
  "/:eventId",
  auth.isAuthenticated,
  auth.canEditSchool,
  events.updateEventById
);
router.delete(
  "/:eventId",
  auth.isAuthenticated,
  auth.canEditSchool,
  events.deleteEventById
);

module.exports = router;
