//Configuration file of Mongoose to create and connect the Database(MongoDB).

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/question-option-api");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

module.exports = db;
