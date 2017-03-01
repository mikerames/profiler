// Load mongoose package
var mongoose = require('mongoose');

var PromotionsSchema = new mongoose.Schema({
  name: String,
  image: String,
  label: String,
  price: String,
  description: String
});

module.exports = mongoose.model('promotions', PromotionsSchema);
