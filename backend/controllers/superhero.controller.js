const Superhero = require("../models/superhero.model");

exports.getAllSuperheroes = async (req, res) => {
  const superheroes = await Superhero.find();

  res.status(200).json({
    status: "success",
    data: {
      superheroes,
    },
  });
};

exports.getSuperhero = async (req, res) => {
  const superhero = await Superhero.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      superhero,
    },
  });
};

exports.createSuperhero = async (req, res) => {
  const superhero = await Superhero.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      superhero,
    },
  });
};

exports.updateSuperhero = async (req, res) => {
  const superhero = await Superhero.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      superhero,
    },
  });
};

exports.deleteSuperhero = async (req, res) => {
  await Superhero.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
};
