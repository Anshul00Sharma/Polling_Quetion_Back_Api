// setting up express server
const express = require("express");
const app = express();
const port = 8000;
// importing mongoose
const db = require("./config/mongoose");

// for get form data
app.use(express.urlencoded());

// using routes
app.use("/", require("./routes"));

// error handling for express
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});
