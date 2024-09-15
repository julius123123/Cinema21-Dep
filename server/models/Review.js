// server/models/review.js

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  placeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Place', // Assuming you already have a Place model
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Assuming you have a User model
    required: true 
  },
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  },
  comment: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
