const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  dog: {
    ref: 'DogModel',
    type: mongoose.Schema.Types.ObjectId,
  },
  text: String,
  date: Date,
  photo: String,
});

module.exports = mongoose.model('Post', PostSchema);
