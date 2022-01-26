const express = require("express");
const res = require("express/lib/response");
global.app = express();
const _ = require("underscore");

const { Pool } = require("pg");
global.pool = new Pool({ database: "servo" });
pool
  .connect()
  .then(() => console.log(`connected to database: ${pool.options.database}`))
  .catch((err) => console.error("connection error", err.stack));

app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/", require("./controllers/appController"));
//BodyParsing
app.use(express.urlencoded({ extended: false }));

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
