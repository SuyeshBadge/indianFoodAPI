const mongoose = require('mongoose');

favoriteSchema = {
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'user not defined for favorite'],
  },
  meal: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Recipe',
      required: [true, 'Meal not Assigned properly'],
    },
  ],
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
};

Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;
