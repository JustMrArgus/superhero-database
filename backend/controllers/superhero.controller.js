const Superhero = require("../models/superhero.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllSuperheroes = catchAsync(async (req, res, next) => {
  let query = Superhero.find();

  const page = +req.query.page || 1;
  const limit = +req.query.limit || 100;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  const superheroes = await query;

  res.status(200).json({
    status: "success",
    data: {
      superheroes,
    },
  });
});

exports.getSuperhero = catchAsync(async (req, res, next) => {
  const superhero = await Superhero.findById(req.params.id);

  if (!superhero) {
    return next(new AppError("No superhero found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      superhero,
    },
  });
});

exports.createSuperhero = catchAsync(async (req, res, next) => {
  const superhero = await Superhero.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      superhero,
    },
  });
});

exports.updateSuperhero = catchAsync(async (req, res, next) => {
  const superhero = await Superhero.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!superhero) {
    return next(new AppError("No superhero found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      superhero,
    },
  });
});

exports.deleteSuperhero = catchAsync(async (req, res, next) => {
  const superhero = await Superhero.findByIdAndDelete(req.params.id);

  if (!superhero) {
    return next(new AppError("No superhero found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
