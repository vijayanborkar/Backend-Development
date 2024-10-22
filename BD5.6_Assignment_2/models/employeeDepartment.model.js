let { DataTypes, sequelize } = require("../lib/index");
let { employee } = require("../models/employee.model");
let { department } = require("../models/department.model");

let employeeDepartment = sequelize.define("employeeDepartment", {
  employeeRoleId: {
    type: DataTypes.INTEGER,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    references: {
      model: employee,
      key: "employeeId",
    },
  },
  departmentId: {
    type: DataTypes.INTEGER,
    references: {
      model: department,
      key: "departmentId",
    },
  },
});

employee.belongsToMany(department, { through: employeeDepartment });
department.belongsToMany(employee, { through: employeeDepartment });

module.exports = { employeeDepartment };
