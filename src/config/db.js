const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "ngo",          
  "root",         
  "20F61A0495@l", 
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;
