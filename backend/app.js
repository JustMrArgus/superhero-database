const express = require("express");
const path = require("path");

const app = express();

const superheroesRoutes = require("./routes/superhero.routes");

const globalErrorController = require("./controllers/error.controller");

app.use(express.json({ limit: "10kb" }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/superheroes", superheroesRoutes);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorController);

module.exports = app;
