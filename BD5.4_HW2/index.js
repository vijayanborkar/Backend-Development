let express = require("express");
let { course } = require("./models/course.model");
let { student } = require("./models/student.model");
let { sequelize } = require("./lib/index");

let app = express();
app.use(express.json());

// courses
let courses = [
  { title: "Math 101", description: "Basic Mathematics" },
  { title: "History 201", description: "World History" },
  { title: "Science 301", description: "Basic Sciences" },
];

// students
let students = [{ name: "John Doe", age: 24 }];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await course.bulkCreate(courses);
    await student.bulkCreate(students);
    res.status(200).json({ message: "Database Seeding Successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

// Exercise 1: Create New Student
async function addNewStudent(newStudent) {
  let createdStudent = await student.create(newStudent);
  return { message: "New Student is Added.", createdStudent };
}

app.post("/students/new", async (req, res) => {
  try {
    let newStudent = req.body.newStudent;
    let response = await addNewStudent(newStudent);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Update Student by ID
async function updateStudentById(newStudentData, id) {
  let studentDetails = await student.findOne({ where: { id } });
  if (!studentDetails) {
    return { message: "Student not found or cannot be updated." };
  }
  studentDetails.set(newStudentData);
  let updatedStudent = await studentDetails.save();
  return { message: "Student is Updated Successfully.", updatedStudent };
}

app.post("/students/update/:id", async (req, res) => {
  try {
    let newStudentData = req.body;
    let id = parseInt(req.params.id);
    let response = await updateStudentById(newStudentData, id);
    if (!response.updatedStudent) {
      return res.status(404).json({ message: "Student cannot be updated" });
    }
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
