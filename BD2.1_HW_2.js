let express = require("express");
let app = express();
let port = 3000;

// Exercise 1:
let githubPublicData = {
  username: "ankit123",
  fullName: "Ankit Kumar",
  email: "ankit@gmail.com",
  repositories: 24,
  gists: 12,
  joinedOn: "Sep 2018",
};

function getProfileUrl(githubPublicData) {
  return `https://github.com/${githubPublicData.username}`;
}

app.get("/github-profile", (req, res) => {
  let profileUrl = getProfileUrl(githubPublicData);
  res.json({ profileUrl: profileUrl });
});

// Exercise 2:
function getPublicEmail(githubPublicData) {
  return githubPublicData.email;
}

app.get("/github-public-email", (req, res) => {
  let publicEmail = getPublicEmail(githubPublicData);
  res.json({ publicEmail: publicEmail });
});

// Exercise 3:
function getReposCount(githubPublicData) {
  return githubPublicData.repositories;
}

app.get("/github-repos-count", (req, res) => {
  let reposCount = getReposCount(githubPublicData);
  res.json({ reposCount: reposCount });
});

// Exercise 4:
function getGistsCount(githubPublicData) {
  return githubPublicData.gists;
}

app.get("/github-gists-count", (req, res) => {
  let gistsCount = getGistsCount(githubPublicData);
  res.json({ gistsCount: gistsCount });
});

// Exercise 5:
function getUserBio(githubPublicData) {
  return {
    fullName: githubPublicData.fullName,
    joinedOn: githubPublicData.joinedOn,
    email: githubPublicData.email,
  };
}

app.get("/github-user-bio", (req, res) => {
  let bio = getUserBio(githubPublicData);
  res.json(bio);
});

// Exercise 6:
function getRepoUrl(githubPublicData, repoName) {
  return `https://github.com/${githubPublicData.username}/${repoName}`;
}

app.get("/github-repo-url", (req, res) => {
  let repoName = req.query.repoName;
  let repoUrl = getRepoUrl(githubPublicData, repoName);
  res.json({ repoUrl: repoUrl });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
