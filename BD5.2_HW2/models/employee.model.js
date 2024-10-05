<<<<<<< HEAD
let { DataTypes, sequelize } = require('../lib/index');

let employee = sequelize.define('employee', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  salary: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  department: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  designation: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = {
  employee,
};
=======
let { DataTypes, sequelize } = require('../lib/index');

let employee = sequelize.define('employee', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  salary: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  department: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  designation: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = {
  employee,
};
>>>>>>> d8e2bf4496ae64274a1e5f75a10a42f0faaac46c
