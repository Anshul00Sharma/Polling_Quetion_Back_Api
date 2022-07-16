//  it routes to the quetions & options route

//importing express
const express = require("express");
const router = express.Router();

// linking que and option routes
router.use("/questions", require("./questions"));
router.use("/options", require("./options"));

module.exports = router;
