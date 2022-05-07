const mongooseInst = require("mongoose");

//schema
const taskListSchema = new mongooseInst.Schema({
  title: {
    type: String,
    minlength: 3,
    required: true,
    trim: true,
  },
});

//model
// pass name of collection , schema
const taskList = mongooseInst.model("taskList", taskListSchema);

module.exports = taskList;
