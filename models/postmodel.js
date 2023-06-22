const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  dog: {
    ref: 'DogModel',
    type: mongoose.Schema.Types.ObjectId,
  },
  text: String,
  date: {
    type: Date,
    default: Date.now,
  },
  photo: String,
  author: String
});

module.exports = mongoose.model('PostModel', PostSchema);