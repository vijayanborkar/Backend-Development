let express = require("express");
let app = express;
let port = 3000;
let cors = require('cors');
app.use(cors());

let activities = [
  { activityId: 1, type: 'Running', duration: 30, caloriesBurned: 300 },
  { activityId: 2, type: 'Swimming', duration: 45, caloriesBurned: 400 },
  { activityId: 3, type: 'Cycling', duration: 60, caloriesBurned: 500 }
];

// Endpoint 1: Add an Activity
function pushActivity(activity) {
  activities.push(activity);
  return activity;
}

app.get("/activities/add", (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let type = req.query.type;
  let duration = parseInt(req.query.duration);
  let caloriesBurned = parseInt(req.query.caloriesBurned);
})

app.listen(port, () => {
  console.log("Server is running on port: " + port);
})