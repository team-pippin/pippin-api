const { Account, School, Event } = require("../models");

exports.getEvents = (request, response) => {
  Article.find({ school: request.params.eventId })
    .populate("school")
    .then(news => {
      response.status(200).json(news);
    })
    .catch(error => {
      console.log(error);
      response.status(500).json(error);
    });
};

exports.createEvent = (request, response) => {
  let userId = request.user.id; // User Token
  let schoolId = request.params.schoolId;
  let author;

  Account.findById(userId)
    .then(account => {
      author = account;
      return School.findById(schoolId);
    })
    .then(school => {
      let event = createEventDocument(author, school, request);
      return event.save();
    })
    .then(() => {
      return this.getEvents(request, response);
    })
    .catch(error => {
      console.log(error);
      response.status(500).json(error);
    });
};

exports.getEventById = (request, response) => {
  let eventId = request.params.eventId;
  Event.findById(eventId)
    .then(event => {
      response.status(200).json(event);
    })
    .catch(error => {
      console.log(error);
      response.status(500).json(error);
    });
};

exports.updateEventById = (request, response) => {};

exports.deleteEventById = (request, response) => {
  let eventId = request.params.eventId;
  Event.findByIdAndRemove(eventId)
    .then(() => {
      return this.getNews(request, response);
    })
    .catch(error => {
      console.log(error);
      response.status(500).json(error);
    });
};

const createEventDocument = (author, school, request) => {
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
