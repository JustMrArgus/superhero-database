const Superhero = require("../models/superhero.model");

const AppError = require("../utils/appError");

exports.getAllSuperheroes = async (req, res, next) => {
  const superheroes = await Superhero.find();

  res.status(200).json({
    status: "success",
    data: {
      superheroes,
    },
  });
};

exports.getSuperhero = async (req, res, next) => {
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
};

exports.createSuperhero = async (req, res, next) => {
  const superhero = await Superhero.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      superhero,
    },
  });
};

exports.updateSuperhero = async (req, res, next) => {
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
};

exports.deleteSuperhero = async (req, res, next) => {
  const superhero = await Superhero.findByIdAndDelete(req.params.id);

  if (!superhero) {
    return next(new AppError("No superhero found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};
