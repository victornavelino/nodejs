// Option 2: Passing parameters separately (other dialects)
const Sequelize = require('sequelize');
const sequelize = new Sequelize('uptasknode', 'root', '12345678', {
  host: 'localhost',
  dialect: 'mysql',
  port: '3306',
  operatorsAliases: false,
  define:{
    timestamps: false
  },
});

module.exports = sequelize;