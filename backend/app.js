const express = require("express");
const path = require("path");

const app = express();

const superheroesRoutes = require("./routes/superhero.routes");

app.use(express.json({ limit: "10kb" }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/superheroes", superheroesRoutes);

module.exports = app;
