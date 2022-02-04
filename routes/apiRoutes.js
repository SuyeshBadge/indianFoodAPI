const express = require('express');
const apiController = require('./../controllers/apiController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.route('/getRandomMeal').get(apiController.getRandomMeal);
router.route('/id/:id').get(authController.protect, apiController.getMealById);

router.get(
  '/getmealbyingredient',
  authController.protect,
  apiController.getIngredient,
);
router.post(
  '/addfavorite',
  authController.protect,
  apiController.addToFavrites,
);
router.get(
  '/getmealbytime',
  authController.protect,
  apiController.getMealByTime,
);

router.get(
  '/getallcuisine',
  authController.protect,
  apiController.getAllCuisine,
);
router.get(
  '/cuisine/:Cuisine',
  // authController.protect,
  apiController.getByCuisine,
);

module.exports = router;
