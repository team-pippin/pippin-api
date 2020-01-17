const { Account, School, Event } = require("../models");

exports.getEvents = async (request, response) => {
  try {
    const events = await Event.find({
      school: request.params.schoolId
    }).populate("school");
    response.status(200).json(events);
  } catch (error) {
    response.status(500).json(error);
  }
};

exports.createEvent = async (request, response) => {
  try {
    const schoolId = request.params.schoolId;
    const school = await School.findById(schoolId);
    const event = createEventDocument(school, request);
    await event.save();
    return await this.getEvents(request, response);
  } catch (error) {
    response.status(500).json(error);
  }
};

exports.getEventById = async (request, response) => {
  try {
    const eventId = request.params.eventId;
    const event = await Event.findById(eventId);
    response.status(200).json(event);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

exports.updateEventById = (request, response) => {};

exports.deleteEventById = async (request, response) => {
  try {
    const eventId = request.params.eventId;
    const event = await Event.findById(eventId);
    return await this.getEvents(request, response);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

const createEventDocument = (school, request) => {
  const author = request.user;
  const { location, startDate, endDate, body, title } = request.body;

  let event = new Event({
    location,
    startDate,
    endDate,
    body,
    title,
    author,
    school
  });

  return event;
};

module.exports = exports;
