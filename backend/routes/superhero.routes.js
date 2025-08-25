const express = require("express");
const superheroController = require("../controllers/superhero.controller");

const router = express.Router();

router
  .route("/")
  .get(superheroController.getAllSuperheroes)
  .post(superheroController.createSuperhero);

router
  .route("/:id")
  .get(superheroController.getSuperhero)
  .patch(superheroController.updateSuperhero)
  .delete(superheroController.deleteSuperhero);

module.exports = router;
