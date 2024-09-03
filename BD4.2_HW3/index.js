const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.port || 3000;
let db;

(async () => {
  db = await open({
    filename: "database.sqlite",
    driver: sqlite3.Database,
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();

// YOUR ENDPOINTS GO HERE

// Exercise 1: Fetch All Companies
async function getAllCompanies() {
  let query = "SELECT * FROM companies";
  let response = await db.all(query);
  return { companies: response };
}

app.get("/companies", async (req, res) => {
  try {
    let result = await getAllCompanies();
    if (result.companies.length === 0) {
      return res.status(404).json({ message: "No Companies Found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.2 HW3 Template" });
});
