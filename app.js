//import
const express = require("express");
const mongooseInst = require("./database/mongoose");
const task = require("./database/models/task");
const taskList = require("./database/models/taskList");
const { response } = require("express");
//inital setup
const app = express();

//middle ware
//1 to tell express we are using json format
app.use(express.json());
//cors control

app.use((req, res, next) => {
  //allow angular fron end
  res.header("Access-Control-Allow-Origin", "http://localhost:4200/");
  // methods to allow
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  //headers to allow
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // to run next middleware
  next();
});

//routes
//1 getting all task list
app.get("/tasklists", (req, res) => {
  taskList
    .find({})
    .then((result) => {
      //send fetched data to the browser as a json format
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// 2 post tasklist

app.post("/tasklists", (req, res) => {
  let taskListObj = { title: req.body.title };
  taskList(taskListObj)
    .save()
    .then((result) => res.status(201).send(result))
    .catch((err) => {
      console.log(err);
    });
});

// 3 get single taskList
app.get("/tasklists/:id", (req, res) => {
  let id = req.params.id;
  taskList
    .findById(id)
    .then((response) => res.send(response))
    .catch((err) => console.log(err));
});

// update tasklist
//4 full update
app.put("/tasklists/:id", (req, res) => {
  let id = req.params.id;
  taskList
    .findByIdAndUpdate(id, { $set: req.body })
    .then((result) => {
      res.status(204).send(result);
      log(result);
    })
    .catch((err) => console.log(err));
});
// partial update

app.patch("/tasklists/:id", (req, res) => {
  let id = req.params.id;
  taskList
    .findByIdAndUpdate(id, { $set: req.body })
    .then((result) => res.status(204).send(result))
    .catch((err) => console.log(err));
});

// delete method

app.delete("/tasklists/:id", (req, res) => {
  let id = req.params.id;
  taskList
    .findByIdAndDelete(id)
    .then((result) => res.status(202).send(result))
    .catch((err) => console.log(err));
});
// starting server
app.listen(3000, () => {
  console.log("server started on localhost:3000");
});
