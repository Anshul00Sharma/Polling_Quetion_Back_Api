const express = require("express");
const router = express.Router();

const optionApi = require("../../../controllers/api/v1/option_api");

router.delete("/:id/delete", optionApi.destroy);
router.post("/create", optionApi.create);
router.get("/:id/add_vote", optionApi.addVote);

module.exports = router;
