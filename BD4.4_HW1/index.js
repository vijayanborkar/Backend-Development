const express = require('express');

const sqlite3 = require('sqlite3').verbose();

const { open } = require('sqlite');

const app = express();

const PORT = process.env.port || 3000;

let db;

(async () => {
  db = await open({
    filename: 'database.sqlite',

    driver: sqlite3.Database,
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();

// YOUR ENDPOINTS GO HERE

// Exercise 1: Fetch All Courses
async function fetchAllCourses() {
  let query = 'SELECT id, title, release_year FROM courses';
  let response = await db.all(query);
  return { courses: response };
}

app.get('/courses', async (req, res) => {
  try {
    let result = await fetchAllCourses();
    if (result.courses.length === 0) {
      return res.status(404).json({ message: 'No courses found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch Courses by Instructor
async function fetchCoursesByInstructor(instructor) {
  let query =
    'SELECT id, title, instructor, category FROM courses WHERE instructor = ?';
  let response = await db.all(query, [instructor]);
  return { courses: response };
}

app.get('/courses/instructor/:instructor', async (req, res) => {
  try {
    let instructor = req.params.instructor;
    let result = await fetchCoursesByInstructor(instructor);
    if (result.courses.length === 0) {
      return res.status(404).json({ message: 'No courses found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch Courses by Category
async function fetchCoursesByCategory(category) {
  let query =
    'SELECT id, title, category, release_year, category FROM courses WHERE category = ?';
  let response = await db.all(query, [category]);
  return { courses: response };
}

app.get('/courses/category/:category', async (req, res) => {
  try {
    let category = req.params.category;
    let result = await fetchCoursesByCategory(category);
    if (result.courses.length === 0) {
      return res.status(404).json({ message: 'No courses found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Fetch Courses by Year
async function fetchCoursesByYear(year) {
  let query =
    'SELECT id, title, release_year, category FROM courses WHERE release_year = ?';
  let response = await db.all(query, [year]);
  return { courses: response };
}

app.get('/courses/year/:year', async (req, res) => {
  try {
    let year = req.params.year;
    let result = await fetchCoursesByYear(year);
    if (result.courses.length === 0) {
      return res.status(404).json({ message: 'No courses found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'BD4.4 HW1 Template' });
});
