const mongoose = require('mongoose'),
 Schema = mongoose.Schema;

let article = new Schema({
  imgUrl: {
    type: String,
    required: false
  },
  sourceUrl: {
    type: String,
    required: false
  },
  publishedDate: {
    type: Date,
    required: true,
    default:  Date.now
  },
  body: {
    type: String,
    required: 'News story cannot be blank'
  },
  subtitle: {
    type: String,
    required: 'News Story needs subtitle'
  },
  title: {
    type: String,
    required: 'News Story needs title'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: 'School',
    required: true
  }
});

module.exports = mongoose.model('NewsArticle', article);
