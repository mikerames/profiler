// Load mongoose package
var mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema({
  name: String,
  profession: String,
  main_photo: String,
  location: String,
  achievements: String,
  rating: String,
  description: String,
  birthday: String,
  photos: [String],
  movies: String,
  media: String
});

module.exports = mongoose.model('profiles', ProfileSchema);