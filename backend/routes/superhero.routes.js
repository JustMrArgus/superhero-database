const express = require("express");
const superheroController = require("../controllers/superhero.controller");
const superheroImagesHandler = require("../middleware/superheroImagesHandler");

const router = express.Router();

router
  .route("/")
  .get(superheroController.getAllSuperheroes)
  .post(
    superheroImagesHandler.uploadSuperheroImages,
    superheroImagesHandler.resizeSuperheroImages,
    superheroController.createSuperhero
  );

router
  .route("/:id")
  .get(superheroController.getSuperhero)
  .patch(
    superheroImagesHandler.uploadSuperheroImages,
    superheroImagesHandler.resizeSuperheroImages,
    superheroController.updateSuperhero
  )
  .delete(superheroController.deleteSuperhero);

module.exports = router;
