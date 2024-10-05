let express = require("express");
let { book } = require("./models/book.model");
let { author } = require("./models/author.model");
let { sequelize } = require("./lib/index");

let app = express();
app.use(express.json());

let books = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    genre: "Fantasy",
    publicationYear: 1997,
  },
  { title: "A Game of Thrones", genre: "Fantasy", publicationYear: 1996 },
  { title: "The Hobbit", genre: "Fantasy", publicationYear: 1937 },
];

let authors = [{ name: "J.K Rowling", birthYear: 1965 }];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await book.bulkCreate(books);
    await author.bulkCreate(authors);
    res.status(200).json({ message: "Database Seeding Successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

// Exercise 1: Create New Author
async function addNewAuthor(newAuthor) {
  let createdAuthor = await author.create(newAuthor);
  return { message: "New Author is Added.", createdAuthor };
}

app.post("/authors/new", async (req, res) => {
  try {
    let newAuthor = req.body.newAuthor;
    let response = await addNewAuthor(newAuthor);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Update Author by ID
async function updateAuthorById(newAuthorData, id) {
  let authorDetails = await author.findOne({ where: { id } });
  if (!authorDetails) {
    return { message: "Author not found or cannot be updated." };
  }
  authorDetails.set(newAuthorData);
  let updateAuthor = await authorDetails.save();
  return { message: "Author is Updated Successfully.", updateAuthor };
}

app.post("/authors/update/:id", async (req, res) => {
  try {
    let newAuthorData = req.body;
    let id = parseInt(req.params.id);
    let response = await updateAuthorById(newAuthorData, id);
    if (!response.updateAuthor) {
      return res.status(404).json({ message: "Author cannot be updated" });
    }
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
