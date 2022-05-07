const mongooseInst = require("mongoose");

//to use promise in data base
mongooseInst.Promise = global.Promise;

// connect database
mongooseInst
  .connect("mongodb://localhost:27017/taskManagerDb")
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

// export mongooseInst
module.exports = mongooseInst;
