//import
const express = require("express");
const mongooseInst = require("./database/mongoose");

//inital setup
const app = express();

// starting server
app.listen(3000, () => {
  console.log("server started on localhost:3000");
});
