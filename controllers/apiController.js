const food = require('../models/recipeModel');
const Favs = require('../models/favoriteModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const { resetpassword } = require('./webController');
const { application } = require('express');
const getRandomId = () => {
  const i = Math.floor(Math.random() * 5940) + 1;
  return i;
};

exports.getRandomMeal = catchAsync(async (req, res) => {
  data = await food.findOne({ mealD: getRandomId() });
  res.status(200).json({
    status: 'success',
    data: data,
  });
});

exports.getMealById = catchAsync(async (req, res, next) => {
  console.log(`Meals Id ${req.params.id}`);
  let query = { mealD: parseInt(req.params.id) };
  if (req.params.id.length > 4) {
    query = { _id: req.params.id };
  }
  data = await food.findOne(query);
  // data = '';
  if (!data) {
    return next(new AppError('Invalid Meal Id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: data,
  });
});

exports.getAllCuisine = catchAsync(async (req, res) => {
  data = await food.distinct('Cuisine');
  [_, ...data] = [...data]; //delete first empty entry
  console.log(data);
  res.status(200).json({
    status: 'success',
    results: data.length,
    data: data,
  });
});

exports.getByCuisine = catchAsync(async (req, res) => {
  Cuisine = req.params.Cuisine.toLowerCase();
  Cuisine = Cuisine[0].toUpperCase() + Cuisine.slice(1);
  // console.log(req.query.limit);
  data = await food.find({ Cuisine: Cuisine }).limit(req.query.limit || 10);

  res.status(200).json({
    status: 'success',
    results: data.length,
    data: data,
  });
});

exports.getMealByTime = catchAsync(async (req, res) => {
  features = new APIFeatures(food.find(), req.query)
    .filter()
    .sort('-TotalTimeInMins')
    .limitFields()
    .paginate();
  const data = await features.query;

  res.status(200).json({
    status: 'success',
    results: data.length,
    data,
  });
});

exports.addToFavrites = catchAsync(async (req, res, next) => {
  // console.log(req.user);
  // console.log(req.body);
  const isFav = await Favs.findOne({
    user: req.user._id,
  }).select('-__v -user ');
  let newFav;
  // console.log(isFav.length);
  if (!req.body.mealid) {
    return next(new AppError('Meal Id not Assigned', 400));
  }
  if (!isFav) {
    // console.log(`hi from create`);
    newFav = await Favs.create({
      user: req.user._id,
      meal: req.body.mealid,
    });
  } else {
    const mealArr = isFav.meal;
    if (mealArr.includes(req.body.mealid)) {
      return next(new AppError('Meal Already Exists', 400));
    } else {
      console.log(isFav.meal);
      isFav.meal.push(req.body.mealid);
      isFav.updatedAt = Date.now();

      newFav = isFav;
      isFav.save();
    }
  }
  res.status(200).json({
    status: 'success',
    data: newFav,
  });
});

exports.getIngredient = catchAsync(async (req, res, next) => {
  features = new APIFeatures(
    food.find({ TranslatedIngredients: { $regex: `${req.query.ingredient}` } }),
    req.query,
  )
    .filter()
    .paginate();
  const data = await features.query;
  if (!data.length) {
    return next(
      new AppError('Ingredient Not given or Invalid ingredient', 400),
    );
  }
  res.status(200).json({
    status: 'success',
    results: data.length,
    data,
  });
});

/*
exports.= catchAsync(async (req, res) => {
  res.status(200).json({
    status: 'success',

  });
});
*/
