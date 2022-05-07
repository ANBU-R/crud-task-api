const mongooseInst = require("mongoose");

//schema
const taskSchema = new mongooseInst.Schema({
  title: {
    type: String,
    minlength: 3,
    required: true,
    trim: true,
  },
  _tasklistId: {
    type: mongooseInst.Types.ObjectId,
    required: true,
  },
  compleated: {
    type: Boolean,
    default: false,
    required: true,
  },
});

//model
// pass name of collection , schema
const task = mongooseInst.model("task", taskSchema);

module.exports = task;
