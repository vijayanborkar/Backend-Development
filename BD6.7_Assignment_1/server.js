const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

let { app } = require("./index.js");
app.listen(3000, () => console.log("Server is running on port 3000"));
