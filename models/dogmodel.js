const mongoose = require('mongoose');

const DogSchema = new mongoose.Schema({
  name: String,
  image: String,
  caption: String,
  breed: String,
  birthday: Date,
  owner: {
    ref: 'Owner',
    type: mongoose.Schema.Types.ObjectId,
  },
  posts: [{
    ref: 'Post',
    type: mongoose.Schema.Types.ObjectId,
  }],
});

module.exports = mongoose.model('DogModel', DogSchema);
