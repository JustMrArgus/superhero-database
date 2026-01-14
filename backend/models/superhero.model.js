const mongoose = require("mongoose");
const fs = require("fs");
const { promisify } = require("util");

const superheroSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: [true, "Superhero must have a nickname"],
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
  images: {
    type: [String],
    required: [true, "Superhero must have images"],
    validate: {
      validator: function (val) {
        return val.length > 0;
      },
      message: "Superhero must have at least one image",
    },
  },
});

superheroSchema.post("findOneAndDelete", async function (doc) {
  if (!doc) return;

  const unlinkAsync = promisify(fs.unlink);

  await Promise.all(
    doc.images.map((fileName) =>
      unlinkAsync(`${__dirname}/../public/img/heroes/${fileName}`)
    )
  );
});

const Superhero = mongoose.model("Superhero", superheroSchema);

module.exports = Superhero;
