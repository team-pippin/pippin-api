const mongoose = require('mongoose'),
 Schema = mongoose.Schema;

var school = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name cannot be blank'
  },
  city: {
    type: String,
    required: 'City cannot be blank'
  },
  state: {
    type: String,
    required: 'State cannot be blank'
  },
  mobileAppConfig: {
    type: Schema.Types.ObjectId,
    //required: true,
    ref: 'AppConfig'
  },
  articles: [{
    type: Schema.Types.ObjectId,
    ref: 'NewsArticle'
  }],
  events: [{
    type: Schema.Types.ObjectId,
    ref: 'CalendarEvent'
  }],
  links: [{
    type: Schema.Types.ObjectId,
    ref: 'Link'
  }]
});

var School = mongoose.model('School', school);

module.exports = School;
