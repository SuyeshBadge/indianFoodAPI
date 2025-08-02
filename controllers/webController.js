const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Favs = require('./../models/favoriteModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const email = require('./../utils/email');
const apiController = require('./apiController');
const authController = require('./authController');
const Food = require('../models/recipeModel');
const User = require('./../models/userModel');
const APIFeatures = require('../utils/apiFeatures');

const getRandomId = () => {
  const i = Math.floor(Math.random() * 5940) + 1;
  return i;
};

//home page
exports.getIndex = catchAsync(async (req, res, next) => {
  // console.log(res.locals);
  res
    .status(200)
    .render('index', { success: true, title: 'The Indian Food DB' });
});

//random meal
exports.getRandomMeal = catchAsync(async (req, res, next) => {
    meal = await Food.findOne({ mealD: getRandomId() }).lean();
  res.status(200).render('meal', { meal, title: 'Random Meal' });
});

//cuisine
exports.getCuisine = catchAsync(async (req, res, next) => {
  cuisine = await Food.distinct('Cuisine');
  console.log(req.query);
  [_, ...cuisine] = [...cuisine];
  let filter = { Cuisine: req.query.cuisine || cuisine[0] };

  feature = new APIFeatures(Food.find(filter), req.query).filter().paginate();
    data = await feature.query.lean();

  res.status(200).render('cuisine', {
    cuisine,
    title: 'Cuisine',
    data,
    curCuisine: req.query.cuisine,
    page: req.query.page || 1,
  });
});

//get meal by id
exports.getMealById = catchAsync(async (req, res, next) => {
  // console.log(req.locals);
  // console.log(req.params.id);
    meal = await Food.findById(req.params.id).lean();
  res.status(200).render('meal', { meal, title: 'Meal' });
});

exports.isLoggedin = catchAsync(async (req, res, next) => {
  // console.log(`hi from logged in `);
  if (req.cookies.jwt) {
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET,
    );

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next();
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next();
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    res.locals.loggedin = true;
    res.locals.user = currentUser;
    // console.log(res.locals);
    return next();
  }
  next();
});

//login
exports.login = catchAsync(async (req, res, next) => {
  res.status(200).render('login', { title: 'Login' });
});

//signup
exports.signup = catchAsync(async (req, res, next) => {
  res.status(200).render('signup', { title: 'signup' });
});

exports.protect = catchAsync(async (req, res, next) => {
  if (!res.locals.user) {
    res.redirect('/login');
  }
  next();
});

exports.notfound = catchAsync(async (req, res, next) => {
  res.render('notfound', { title: 'Not Found' });
});

exports.addFavs = catchAsync(async (req, res, next) => {
  console.log(res.locals.user._id);
  const isFav = await Favs.findOne({ user: res.locals.user._id });
  let newFav;
  console.log(isFav);
  if (!isFav) {
    console.log(`hi from create`);
    newFav = await Favs.create({
      user: res.locals.user._id,
      meal: req.params.meal,
    });
  } else {
    const mealArr = isFav.meal;
    if (mealArr.includes(req.params.meal)) {
      return next(new AppError('Meal Already Exists', 500));
    } else {
      console.log(isFav.meal);
      isFav.meal.push(req.params.meal);
      isFav.updatedAt = Date.now();
      newFav = isFav;
      isFav.save();
    }
  }
  res.status(200).redirect('/favorite');
});

exports.getMe = catchAsync(async (req, res, next) => {
  res.status(200).render('dashboard', {});
});

exports.getFavorite = catchAsync(async (req, res, next) => {
  feature = new APIFeatures(Favs.findOne({ user: res.locals.user }), req.query)
    .filterOne()
    .paginate();
    let data = await feature.query.populate('meal').lean();
  // Favs.findOne({ user: res.locals.user }).populate('meal');
  // console.log('data', data);
  if (data) data = data.meal;
  res.status(200).render('favorite', {
    data,
    title: 'Favorite',
    page: req.query.page || 1,
  });
});

exports.forgotpassword = catchAsync(async (req, res, next) => {
  res.status(200).render('forgotpassword', { title: 'Forgot Password' });
});

exports.resetpassword = catchAsync(async (req, res, next) => {
  if (!req.query.token) {
    res.status(401).redirect('/login');
  }
  res.status(200).render('resetpassword', {
    title: 'Reset Password',
    resettoken: req.query.token,
  });
});
/*
exports. = catchAsync(async (req, res, next) => {
  res.status(200).render('', {  });

})
*/
