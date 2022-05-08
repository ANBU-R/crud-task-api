//import
const express = require("express");
const mongooseInst = require("./database/mongoose");
const tasks = require("./database/models/task");
const taskLists = require("./database/models/taskList");
const { response } = require("express");
//inital setup
const app = express();

//middleware
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
  taskLists
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
  taskLists(taskListObj)
    .save()
    .then((result) => res.status(201).send(result))
    .catch((err) => {
      console.log(err);
    });
});

// 3 get single taskList
app.get("/tasklists/:tasklistid", (req, res) => {
  let tasklistid = req.params.tasklistid;
  taskLists
    .findById(tasklistid)
    .then((response) => res.send(response))
    .catch((err) => console.log(err));
});

// update tasklist
//4 full update
app.put("/tasklists/:tasklistid", (req, res) => {
  let tasklistid = req.params.tasklistid;
  taskLists
    .findByIdAndUpdate(tasklistid, { $set: req.body })
    .then((result) => {
      res.status(204).send(result);
      log(result);
    })
    .catch((err) => console.log(err));
});
// partial update

app.patch("/tasklists/:tasklistid", (req, res) => {
  let tasklistid = req.params.tasklistid;
  taskLists
    .findByIdAndUpdate(tasklistid, { $set: req.body })
    .then((result) => res.status(204).send(result))
    .catch((err) => console.log(err));
});

// delete method

app.delete("/tasklists/:tasklistid", (req, res) => {
  let tasklistid = req.params.tasklistid;
  taskLists
    .findByIdAndDelete(tasklistid)
    .then((result) => res.status(202).send(result))
    .catch((err) => console.log(err));
});

//crud operation for task
// get all tasks belongs to one tasklist

app.get("/tasklists/:tasklistid/tasks", (req, res) => {
  let tasklistid = req.params.tasklistid;
  tasks
    .find({ _tasklistId: tasklistid })
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
//create task inside a tasklist

app.post("/tasklists/:tasklistid/tasks", (req, res) => {
  let taskObj = { title: req.body.title, _tasklistId: req.params.tasklistid };
  tasks(taskObj)
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

//get one particular task
app.get("/tasklists/:tasklistid/tasks/:taskid", (req, res) => {
  tasks
    .findOne({ _tasklistId: req.params.tasklistid, _id: req.params.taskid })
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

//update task

app.patch("/tasklists/:tasklistid/tasks/:taskid", (req, res) => {
  tasks
    .findOneAndUpdate(
      { _tasklistId: req.params.tasklistid, _id: req.params.taskid },
      { $set: req.body }
    )
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

//delete task list
app.delete("/tasklists/:tasklistid/tasks/:taskid", (req, res) => {
  tasks
    .findOneAndDelete({
      _tasklistId: req.params.tasklistid,
      _id: req.params.taskid,
    })
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

//
//
//
// starting server
app.listen(3000, () => {
  console.log("server started on localhost:3000");
});
