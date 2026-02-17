const { DataTypes } = require("sequelize");

const createProgram = (sequelize) => {
  return sequelize.define(
    "Program",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      agenda: {
        type: DataTypes.STRING,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "Program",
      timestamps: true, // ⚠️ FIX spelling
    }
  );
};

module.exports = createProgram;
