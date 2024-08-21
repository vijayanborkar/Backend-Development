const sqlite3 = require("sqlite3").verbose();

// Connect to SQLite database
const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
    createTableAndInsertData();
  }
});

function createTableAndInsertData() {
  db.serialize(() => {
    // Create a movies table with additional columns
    db.run(
      `CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        director TEXT,
        genre TEXT,
        release_year INTEGER,
        rating REAL,
        actor TEXT,
        box_office_collection REAL
      )`,
      (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
          return;
        }
        console.log("Movies table created or already exists.");

        // Insert random movie data
        const stmt = db.prepare(
          "INSERT INTO movies (title, director, genre, release_year, rating, actor, box_office_collection) VALUES (?, ?, ?, ?, ?, ?, ?)",
        );

        const movies = [
          // Unique Bollywood Movies
          {
            title: "Dangal",
            director: "Nitesh Tiwari",
            genre: "Biography",
            release_year: 2016,
            rating: 4.8,
            actor: "Aamir Khan",
            box_office_collection: 220,
          },
          {
            title: "Baahubali 2: The Conclusion",
            director: "S.S. Rajamouli",
            genre: "Action",
            release_year: 2017,
            rating: 4.7,
            actor: "Prabhas",
            box_office_collection: 181,
          },
          {
            title: "PK",
            director: "Rajkumar Hirani",
            genre: "Comedy",
            release_year: 2014,
            rating: 4.6,
            actor: "Aamir Khan",
            box_office_collection: 140,
          },
          {
            title: "Bajrangi Bhaijaan",
            director: "Kabir Khan",
            genre: "Drama",
            release_year: 2015,
            rating: 4.5,
            actor: "Salman Khan",
            box_office_collection: 130,
          },
          {
            title: "Sultan",
            director: "Ali Abbas Zafar",
            genre: "Drama",
            release_year: 2016,
            rating: 4.3,
            actor: "Salman Khan",
            box_office_collection: 120,
          },
          {
            title: "Sanju",
            director: "Rajkumar Hirani",
            genre: "Biography",
            release_year: 2018,
            rating: 4.4,
            actor: "Ranbir Kapoor",
            box_office_collection: 120,
          },
          {
            title: "Padmaavat",
            director: "Sanjay Leela Bhansali",
            genre: "Drama",
            release_year: 2018,
            rating: 4.2,
            actor: "Ranveer Singh",
            box_office_collection: 112,
          },
          {
            title: "3 Idiots",
            director: "Rajkumar Hirani",
            genre: "Comedy",
            release_year: 2009,
            rating: 4.9,
            actor: "Aamir Khan",
            box_office_collection: 202,
          },
          {
            title: "Chennai Express",
            director: "Rohit Shetty",
            genre: "Comedy",
            release_year: 2013,
            rating: 4.0,
            actor: "Shah Rukh Khan",
            box_office_collection: 100,
          },
          {
            title: "War",
            director: "Siddharth Anand",
            genre: "Action",
            release_year: 2019,
            rating: 4.3,
            actor: "Hrithik Roshan",
            box_office_collection: 100,
          },
          {
            title: "Kabir Singh",
            director: "Sandeep Reddy Vanga",
            genre: "Romance",
            release_year: 2019,
            rating: 4.2,
            actor: "Shahid Kapoor",
            box_office_collection: 80,
          },
          {
            title: "Gully Boy",
            director: "Zoya Akhtar",
            genre: "Drama",
            release_year: 2019,
            rating: 4.4,
            actor: "Ranveer Singh",
            box_office_collection: 75,
          },
          {
            title: "Andhadhun",
            director: "Sriram Raghavan",
            genre: "Thriller",
            release_year: 2018,
            rating: 4.5,
            actor: "Ayushmann Khurrana",
            box_office_collection: 60,
          },
          {
            title: "Tumbbad",
            director: "Rahi Anil Barve",
            genre: "Horror",
            release_year: 2018,
            rating: 4.3,
            actor: "Sohum Shah",
            box_office_collection: 50,
          },
          {
            title: "Stree",
            director: "Amar Kaushik",
            genre: "Comedy",
            release_year: 2018,
            rating: 4.0,
            actor: "Rajkummar Rao",
            box_office_collection: 60,
          },
          {
            title: "Badhaai Ho",
            director: "Amit Sharma",
            genre: "Comedy",
            release_year: 2018,
            rating: 4.2,
            actor: "Ayushmann Khurrana",
            box_office_collection: 45,
          },
          {
            title: "Article 15",
            director: "Anubhav Sinha",
            genre: "Drama",
            release_year: 2019,
            rating: 4.6,
            actor: "Ayushmann Khurrana",
            box_office_collection: 35,
          },
          {
            title: "URI: The Surgical Strike",
            director: "Aditya Dhar",
            genre: "Action",
            release_year: 2019,
            rating: 4.7,
            actor: "Vicky Kaushal",
            box_office_collection: 70,
          },
        ];

        for (let movie of movies) {
          stmt.run(
            movie.title,
            movie.director,
            movie.genre,
            movie.release_year,
            movie.rating,
            movie.actor,
            movie.box_office_collection,
          );
        }
        stmt.finalize(() => {
          console.log("Inserted 18 Bollywood movies into the database.");

          // Close the database connection
          db.close((err) => {
            if (err) {
              console.error("Error closing database:", err.message);
            } else {
              console.log("Database connection closed.");
            }
          });
        });
      },
    );
  });
}
