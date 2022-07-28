// import express
const express = require("express");
// callsing router
const router = express.Router();
// importing options controller
const optionsApi = require("../controllers/options_controller");

//route for deleting option
router.post("/:id/delete", optionsApi.deleteOption);

//to increment the count of votes
router.post("/:id/add_vote", optionsApi.addVote);

//exporting the router
module.exports = router;
