const mongoose = require("mongoose");

const superheroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Superhero must have a name"],
    trim: true,
  },
  real_name: {
    type: String,
    required: [true, "Superhero must have a real name"],
    trim: true,
  },
  origin_description: {
    type: String,
    required: [true, "Superhero must have a description"],
  },
  superpowers: {
    type: [String],
    required: [true, "Superhero must have superpowers"],
    validate: {
      validator: function (val) {
        return val.length > 0;
      },
      message: "Superhero must have at least one superpower",
    },
  },
  catch_phrase: {
    type: String,
    required: [true, "Superhero must have a catch phrase"],
  },
  image: {
    type: String,
    required: [true, "Superhero must have a image"],
  },
});

const Superhero = mongoose.model("Superhero", superheroSchema);

module.exports = Superhero;
