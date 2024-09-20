let { DataTypes, sequelize } = require("../lib/index");
let { user } = require("./user.model");
let { track } = require("./track.model");

let like = sequelize.define("like", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: user,
      keys: "id",
    },
  },
  trackId: {
    type: DataTypes.INTEGER,
    references: {
      model: track,
      keys: "id",
    },
  },
});

user.belongsToMany(track, { through: like });
track.belongsToMany, { through: like };

module.exports = { like };
