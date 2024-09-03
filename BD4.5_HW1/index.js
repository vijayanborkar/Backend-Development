const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const app = express();
const PORT = process.env.port || 3000;

let db;

(async () => {
  db = await open({
    filename: 'BD4.5_HW1/database.sqlite',

    driver: sqlite3.Database,
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();

// YOUR ENDPOINTS GO HERE

// Exercise 1: Fetch Courses by Minimum Rating
async function filterCoursesByRating(minRating) {
  let query = 'SELECT * FROM courses WHERE rating > ?';
  let response = await db.all(query, [minRating]);
  return { courses: response };
}

app.get('/courses/rating', async (req, res) => {
  try {
    let minRating = req.query.minRating;
    let result = await filterCoursesByRating(minRating);
    if (result.courses.length === 0) {
      return res.status(404).json({ message: 'No courses found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch Courses by Instructor and Minimum Duration
async function filterCoursesByInstructorAndDuration(instructor, minDuration) {
  let query = 'SELECT * FROM courses WHERE instructor = ? AND duration > ?';
  let response = await db.all(query, [instructor, minDuration]);
  return { courses: response };
}

app.get('/courses/instructor-duration', async (req, res) => {
  try {
    let instructor = req.query.instructor;
    let minDuration = req.query.minDuration;
    let result = await filterCoursesByInstructorAndDuration(
      instructor,
      minDuration
    );
    if (result.courses.length === 0) {
      return res.status(404).json({ message: 'No courses found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch Courses Ordered by Price
async function fetchCoursesOrderedByPrice() {
  let query = 'SELECT * FROM courses ORDER BY price DESC';
  let response = await db.all(query);
  return { courses: response };
}

app.get('/courses/ordered-by-price', async (req, res) => {
  try {
    let result = await fetchCoursesOrderedByPrice();
    if (result.courses.length === 0) {
      return res.status(404).json({ message: 'No courses found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'BD4.5 HW1 Template' });
});
