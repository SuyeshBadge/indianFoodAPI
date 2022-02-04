const mongoose = require('mongoose');
const foodSchema = new mongoose.Schema({
  mealD: Number,
  TranslatedRecipeName: String,
  TranslatedIngredients: String,
  TotalTimeInMins: Number,
  Cuisine: String,
  TranslatedInstructions: String,
  URL: String,
  'Cleaned-Ingredients': String,
  'image-url': String,
  'Ingredient-count': Number,
});
const Food = mongoose.model('Recipe', foodSchema);
module.exports = Food;
