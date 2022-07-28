// importing question and option models
const Question = require("../models/quetions");
const Option = require("../models/options");

//for deleting an option
module.exports.deleteOption = async function (req, res) {
  try {
    // console.log(req.params.id);
    let option = await Option.findById(req.params.id);
    if (option) {
      let questionId = option.question;
      //option having greater than 0 cannot be deleted as per document
      if (option.vote > 0) {
        return res.status(403).json({
          message: "Cannot delete this option because this option have votes",
        });
      }
      option.remove();
      // updating quetions database
      let question = Question.findByIdAndUpdate(questionId, {
        $pull: { options: req.params.id },
      });
      return res.status(200).json({
        message: "option deleted successfully",
      });
    }
  } catch (err) {
    console.log("Error " + err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
//for incrementing the count of votes
module.exports.addVote = async function (req, res) {
  try {
    let option = await Option.findById(req.params.id);
    if (option) {
      option.vote += 1; //increments by 1
      option.save();
      return res.status(200).json({
        message: "The vote is added to the question ",
        option: option,
      });
    }
  } catch (err) {
    console.log("Error " + err);
    return res.status(500).json({
      message: "Internal server error ",
    });
  }
};
