let express = require("express");
let app = express();
let port = 3000;

let watchList = [
  {
    videoId: 1,
    title: "JavaScript Tutorial",
    watched: false,
    url: "https://youtu.be/shorturl1",
  },
  {
    videoId: 2,
    title: "Node.js Basics",
    watched: true,
    url: "https://youtu.be/shorturl2",
  },
  {
    videoId: 3,
    title: "React.js Guide",
    watched: false,
    url: "https://youtu.be/shorturl3",
  },
];

// Exercise 1: Update the Watched Status of a Video by ID
function updateWatchedStatusById(watchList, videoId, watched) {
  for (let i = 0; i < watchList.length; i++) {
    watchList[i].watched = watched;
    break;
  }
  return watchList;
}

app.get("/watchlist/update", (req, res) => {
  let videoId = req.query.videoId;
  let watched = req.query.watched === "true";
  let result = updateWatchedStatusById(watchList, videoId, watched);
  res.json(result);
});

// Exercise 2: Update the Watched Status of All Videos
function updateWatchedStatusAll(watchList, watched) {
  for (let i = 0; i < watchList.length; i++) {
    watchList[i].watched = watched;
  }
  return watchList;
}

app.get("/watchlist/update-all", (req, res) => {
  let watched = req.query.watched === "true";
  let result = updateWatchedStatusAll(watchList, watched);
  res.json(result);
});

// Exercise 3: Delete a Video by ID
function shouldDeleteById(video, videoId) {
  return video.videoId !== videoId;
}

app.get("/watchlist/delete", (req, res) => {
  let videoId = parseInt(req.query.videoId);
  let result = watchList.filter((video) => shouldDeleteById(video, videoId));
  watchList = result;
  res.json(result);
});

// Exercise 4: Delete Watched Videos
function isWatched(video) {
  return video.watched === false;
}

app.get("/watchlist/delete-watched", (req, res) => {
  let result = watchList.filter((video) => isWatched(video));
  watchList = result;
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
