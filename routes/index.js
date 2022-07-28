// importing express instance
const express = require("express");
// getting express router
const router = express.Router();

//Further routes of pollingApi
router.use("/questions", require("./quetions"));
router.use("/options", require("./options"));

//exporting the router
module.exports = router;
