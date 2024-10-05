let express = require("express");
let app = express();
let port = 3000;
let cors = require("cors");
app.use(cors());

let tasks = [
  { taskId: 1, text: "Fix bug #101", priority: 2 },
  { taskId: 2, text: "Implement feature #202", priority: 1 },
  { taskId: 3, text: "Write documentation", priority: 3 },
];

// Endpoint 1. Add a Task to the Task List
function addTask(taskId, text, priority) {
  tasks.push({ taskId, text, priority });
  return tasks;
}

app.get("/tasks/add", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  let result = addTask(taskId, text, priority);
  res.json({ tasks: result });
});

// Endpoint 2. Read All Tasks in the Task List
app.get("/tasks", (req, res) => {
  res.json({ tasks });
});

// Endpoint 3. Sort Tasks by Priority
function sortTasksByPriority(tasksCopy) {
  return tasksCopy.sort((a, b) => a.priority - b.priority);
}

app.get("/tasks/sort-by-priority", (req, res) => {
  let tasksCopy = tasks.slice();
  let result = sortTasksByPriority(tasksCopy);
  res.json({ tasks: result });
});

// Endpoint 4. Edit Task Priority
function editTaskPriority(taskId, newPriority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = newPriority;
      break;
    }
  }
  return tasks;
}

app.get("/tasks/edit-priority", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let result = editTaskPriority(taskId, priority);
  res.json({ tasks: result });
});

// Endpoint 5. Edit/Update Task Text
function editTaskText(taskId, newText) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = newText;
      break;
    }
  }
  return tasks;
}

app.get("/tasks/edit-text", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let result = editTaskText(taskId, text);
  res.json({ tasks: result });
});

// Endpoint 6. Delete a Task from the Task List
function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.taskId !== taskId);
  return tasks;
}

app.get("/tasks/delete", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let result = deleteTask(taskId);
  res.json({ tasks: result });
});

// Endpoint 7. Filter Tasks by Priority
function filterTasksByPriority(tasks, priority) {
  return tasks.filter((task) => task.priority === priority);
}

app.get("/tasks/filter-by-priority", (req, res) => {
  let priority = parseInt(req.query.priority);
  let result = filterTasksByPriority(tasks, priority);
  res.json({ tasks: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
