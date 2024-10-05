let { DataTypes, sequelize } = require("../lib/index");
let { user } = require("../models/user.model");
let { movie } = require("../models/movie.model");

let like = sequelize.define("like", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: user,
      key: "id",
    },
  },
  movieId: {
    type: DataTypes.INTEGER,
    references: {
      model: movie,
      key: "id",
    },
  },
});

user.belongsToMany(movie, { through: like });
movie.belongsToMany(user, { through: like });

module.exports = { like };
