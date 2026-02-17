const { DataTypes } = require("sequelize");

const createGallery = (sequelize) => {
  return sequelize.define(
    "Gallery",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      category: {
        type: DataTypes.ENUM("gallery", "carousel"),
        allowNull: false,
      },
    },
    {
      tableName: "Gallery",
      timestamps: true,
    }
  );
};

module.exports = createGallery;
