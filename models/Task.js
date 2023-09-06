const mongoose = require("mongoose");

const availableCountries = require('../db/countries')

const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, "Please provide task name"],
    maxlength: 50,
  },
  position: {
    type: String,
    required: [true, "Please provide position"],
    minlength:3,
    maxlength: 40,
  },
  countryOfOrigin: {
    type: String,
    require: [true, `Please provide one from Developed Countries`],
    enum:availableCountries,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
});

module.exports = mongoose.model("Task", TaskSchema);

