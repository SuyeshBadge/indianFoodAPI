const express = require('express');
const authController = require('./../controllers/authController');
const webController = require('./../controllers/webController');
const apiController = require('./../controllers/apiController');
const router = express.Router();

router.use(webController.isLoggedin);
router.route('/').get(webController.getIndex);
router.route('/me').get(webController.protect, webController.getMe);
router.route('/login').get(webController.login);
router.route('/forgotpassword').get(webController.forgotpassword);
router.route('/resetpassword').get(webController.resetpassword);
router.route('/signup').get(webController.signup);
router.route('/random-meal').get(webController.getRandomMeal);
router.route('/cuisine').get(webController.protect, webController.getCuisine);
router.route('/favorite').get(webController.protect, webController.getFavorite);
router
  .route('/addFavorite/:meal')
  .get(webController.protect, webController.addFavs);
router.route('/id/:id').get(webController.getMealById);
router.route('/notfound').get(webController.notfound);
router.all('*', (req, res, next) => {
  res.redirect('/notfound');
});
module.exports = router;
