dotenv.config({ path: "./.env" });

const app = require("./app");
const connectDB = require("./db/connectDB");

connectDB(process.env.DB).then(() => {
  const port = process.env.port || 3000;
  const server = app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
  });
});
