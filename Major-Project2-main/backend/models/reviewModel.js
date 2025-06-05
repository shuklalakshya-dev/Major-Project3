const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'users' },
  template: { type: mongoose.Types.ObjectId, ref: 'templatesData' },
  rating: Number,
  review: String,
  createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
