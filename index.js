const express = require("express");
const path = require("path");
const indexRoute = require("./routes/indexRoute");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

// Middleware for express
app.use(express.urlencoded({ extended: false })); // req.body will be undefined if not using this command line

app.use("/", indexRoute);

app.listen(3002, function () {
  console.log(
    "Server running. Visit: localhost:3002/reminders in your browser 🚀"
  );
});
