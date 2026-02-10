const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "ngo",          
  "root",         
  "12345", 
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;
