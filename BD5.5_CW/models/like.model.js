let { DataTypes, sequelize } = require("../lib/index");
let { user } = require("../models/user.model");
let { track } = require("../models/track.model");

let like = sequelize.define("like", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: user,
      key: "id",
    },
  },
  trackId: {
    type: DataTypes.INTEGER,
    references: {
      model: track,
      key: "id",
    },
  },
});

user.belongsToMany(track, { through: like });
track.belongsToMany(user, { through: like });

module.exports = { like };
