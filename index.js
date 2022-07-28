// import express
const express = require("express");
//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const bodyParser = require("body-parser");
//running express app
const app = express();
// setting port number to 8000
const port = 8000;
// mongoose configuration
const db = require("./config/mongoose");

//using middleware for getting data from user
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//use express router
app.use("/", require("./routes"));

//This app starts a server and listens on port 8000 for connections.
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`); //not connected
  }
  console.log(`Server is running on port: ${port}`); //connected successfully
});
