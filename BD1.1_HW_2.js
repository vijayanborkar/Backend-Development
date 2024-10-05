let express = require("express");
let app = express();
let port = 3000;

// Question 1
app.get("/custom-commit", (req, res) => {
  let type = req.query.type;
  let message = req.query.message;
  let customCommit = type + ": " + message;
  res.send(customCommit);
})

// Question 2
app.get("/certificate", (req, res) => {
  let firstName = req.query.firstName;
  let lastName = req.query.lastName;
  let courseName = req.query.courseName;
  let certificate =
    "This certificate is awarded to " +
    firstName +
    " " +
    lastName +
    " for completing the course " +
    courseName;
  res.send(certificate);
});

// Question 3
app.get("/autoreply", (req, res) => {
  let startMonth = req.query.startMonth;
  let endMonth = req.query.endMonth;
  let autoreply =
    "Dear customer, thank you for reaching out to me. Unfotrunately, I'm out of office from " +
    startMonth +
    " till " +
    endMonth +
    " Your enquiry will be resolved by another colleague.";
  res.send(autoreply);
});

// Question 4
app.get("/secureurl", (req, res) => {
  let domain = req.query.domain;
  let secureurl = "https://" + domain;
  res.send(secureurl);
});

// Question 5
app.get("/sendotp", (req, res) => {
  let otpCode = req.query.otpCode;
  let sendotp = "Your OTP for account verification is " + otpCode + ". Do not share this with anyone";
  res.send(sendotp);
})

// Question 6
app.get("/welcome", (req, res) => {
  let firstName = req.query.firstName;
  let email = req.query.email;
  let welcome =
    "Hey " +
    firstName +
    ". We're excited to have you here, we'll send future notifications to your registered mail " +
    "(" +
    email +
    ")";
  res.send(welcome);
});

// Question 7
app.get("/github-profile", (req, res) => {
  let userName = req.query.userName;
  let githubProfile = "https://github.com/" + userName;
  res.send(githubProfile);
})

// Question 8
app.get("/text-to-csv", (req, res) => {
  let id = req.query.id;
  let email = req.query.email;
  let rollNumber = req.query.rollNumber;
  let testToCsv = id + "," + email + "," + rollNumber;
  res.send(testToCsv);
})

app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
