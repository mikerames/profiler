// Load mongoose package
var mongoose = require('mongoose');

var DishesSchema = new mongoose.Schema({
  name: String,
  image: String,
  category: String,
  label: String,
  price: String,
  description: String
});

module.exports = mongoose.model('dishes', DishesSchema);