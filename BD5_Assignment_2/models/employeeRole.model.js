let { DataTypes, sequelize } = require("../lib/index");
let { employee } = require("../models/employee.model");
let { role } = require("../models/role.model");

let employeeRole = sequelize.define("employeeRole", {
  employeeRoleId: {
    type: DataTypes.INTEGER,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    references: employee,
    key: "employeeId",
  },
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: role,
      key: "roleId",
    },
  },
});

employee.belongsToMany(role, { through: employeeRole });
role.belongsToMany(employee, { through: employeeRole });

module.exports = { employeeRole };
