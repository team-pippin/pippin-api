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
  pubDate: {
    type: Date,
    required: true,
    default:  Date.now
  },
  story: {
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
  }
});

module.exports = mongoose.model('NewsArticle', article);
