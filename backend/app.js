const express = require("express");
const path = require("path");

const app = express();

app.use(express.json({ limit: "10kb" }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  console.log("Hello World!");
});

module.exports = app;
