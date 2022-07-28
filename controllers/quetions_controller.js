// importing the models of quetion and option
const Question = require("../models/quetions");
const Option = require("../models/options");

// create a quetion
module.exports.create = async function (req, res) {
  // catching server error
  try {
    let question = await Question.create({
      // providing quetions to mongoose model
      question: req.body.question,
      options: req.body.options,
    });
    // conformation api response
    if (question) {
      return res.status(200).json({
        message: "Quetion Added Successfully!",
        question,
      });
    } else {
      return res.status(421).json({
        message: "Error while adding quetion : Bad Request",
      });
    }
  } catch (err) {
    console.log("Error :" + err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
// for display the quetion with its options
module.exports.getQuestion = async function (req, res) {
  // getting quetion by using id
  let question = await Question.findById(req.params.id).populate("options");
  if (question) {
    let options = question.options;
    let arrayOption = [];
    for (let option of options) {
      // getting all the options of the quetion
      arrayOption.push({
        option: option.option,
        vote: option.vote,
        link_to_vote: option.link_to_vote,
      });
    }
    return res.status(200).json({
      message: "The question is : ",
      question: {
        question: question.question,
        options: arrayOption,
      },
    });
  } else {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// for adding option for specific quetion
module.exports.addOptions = async function (req, res) {
  // catching server error
  try {
    console.log(req.params.id);
    let question = await Question.findById(req.params.id);
    if (question) {
      let option = await Option.create({
        option: req.body.option,
        quetion: req.params.id,
        vote: 0,
        link_to_vote: " ",
      });

      option.link_to_vote = `${req.protocol}://${req.headers.host}/options/${option.id}/add_vote`;
      option.save();
      question.options.push(option);
      question.save();
      return res.status(200).json({
        message: "Successfully added a option",
        option: {
          option: option.option,
          link_to_vote: option.link_to_vote,
        },
      });
    } else {
      return res.status(421).json({
        message: "Error Invalid quetion | bad request",
      });
    }
  } catch (err) {
    console.log("Error :" + err);
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
};

//for deleting a question and all its options
module.exports.deleteQuestion = async function (req, res) {
  // catching server error
  try {
    let question = await Question.findById(req.params.id);
    if (question) {
      let options = question.options;
      for (let i = 0; i < options.length; i++) {
        let option = await Option.findById(options[i]);
        //question with option having greater than 0 vote cannot be deleted
        if (option && option.vote > 0) {
          return res.status(403).json({
            message:
              "this quetion cannot be deleted because its options have votes",
          });
        }
      }
      question.remove();
      await Option.deleteMany({ question: req.params.id });
      return res.status(200).json({
        message: "Question and its options are deleted successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
