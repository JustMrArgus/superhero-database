const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception occured...");
  console.log(err.name, err.message);
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: "./.env" });

const app = require("./app");
const connectDB = require("./db/connectDB");

connectDB(process.env.DB).then(() => {
  const port = process.env.PORT || 3000;
  const server = app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
  });

  process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection occured...");
    console.log(err.name, err.message);
    server.close(() => process.exit(1));
  });
});
