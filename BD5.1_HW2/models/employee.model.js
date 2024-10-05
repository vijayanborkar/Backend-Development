let { DataTypes, sequelize } = require('../lib/index');

let employee = sequelize.define('employee', {
  employeeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  department: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  salary: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hireDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  isFullTime: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = {
  employee,
};
