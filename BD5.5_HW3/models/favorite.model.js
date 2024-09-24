let { DataTypes, sequelize } = require("../lib/index");
let { user } = require("../models/user.model");
let { recipe } = require("../models/recipe.model");

let favorite = sequelize.define("favorite", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: user,
      key: "id",
    },
  },
  recipeId: {
    type: DataTypes.INTEGER,
    references: {
      model: recipe,
      key: "id",
    },
  },
});

user.belongsToMany(recipe, { through: favorite });
recipe.belongsToMany(user, { through: favorite });

module.exports = { favorite };
