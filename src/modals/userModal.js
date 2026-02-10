const { DataTypes } = require("sequelize");

const createUsers = (sequelize) => {
  return sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Users",   // ✅ fixed
      timestamps: true,
    }
  );
};

module.exports = createUsers;
