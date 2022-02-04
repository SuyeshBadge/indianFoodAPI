const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword', authController.resetPassword);
router
  .route('/updateMe')
  .patch(authController.protect, userController.updateMe);

router.get(
  '/getalluser',
  authController.protect,
  authController.restrictTo('admin'),
  userController.getAllUsers,
);
router.patch(
  '/updatepassword',
  authController.protect,
  authController.updatePassword,
);

router.get('/me', authController.protect, authController.getMe);
module.exports = router;
