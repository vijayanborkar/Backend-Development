let express = require("express");
let { dish } = require("./models/dish.model");
let { chef } = require("./models/chef.model");
let { sequelize } = require("./lib/index");

let app = express();
app.use(express.json());

// dishes
let dishes = [
  {
    name: "Margherita Pizza",
    cuisine: "Italian",
    preparationTime: 20,
  },
  {
    name: "Sushi",
    cuisine: "Japanese",
    preparationTime: 50,
  },
  {
    name: "Poutine",
    cuisine: "Canadian",
    preparationTime: 30,
  },
];

// chefs
let chefs = [
  { name: "Gordon Ramsay", birthYear: 1966 },
  { name: "Masaharu Morimoto", birthYear: 1955 },
  { name: "Ricardo Larrivée", birthYear: 1967 },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await dish.bulkCreate(dishes);
    await chef.bulkCreate(chefs);
    res.status(200).json({ message: "Database Seeding Successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

// Exercise 1: Create New Chef
async function addNewChef(newChef) {
  let createdChef = await chef.create(newChef);
  return { message: "New Chef is Added.", createdChef };
}

app.post("/chefs/new", async (req, res) => {
  try {
    let newChef = req.body.newChef;
    let response = await addNewChef(newChef);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Update Chef by ID
async function updateChefById(newChefData, id) {
  let chefDetails = await chef.findOne({ where: { id } });
  if (!chefDetails) {
    return { message: "Chef not found or cannot be updated." };
  }
  chefDetails.set(newChefData);
  let updatedChef = await chefDetails.save();
  return { message: "Chef is Updated Successfully.", updatedChef };
}

app.post("/chefs/update/:id", async (req, res) => {
  try {
    let newChefData = req.body;
    let id = parseInt(req.params.id);
    let response = await updateChefById(newChefData, id);
    if (!response.updatedChef) {
      return res.status(404).json({ message: "Chef cannot be updated" });
    }
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
