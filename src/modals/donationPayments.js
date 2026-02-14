const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Donation = sequelize.define(
    "Donation",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      donorName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      donorPhone : {
        type : DataTypes.STRING,
        allowNull : false
      },

      donorEmail: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      amount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      donationFor : {
        type : DataTypes.STRING,
        allowNull : true
      },
      payment_method: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      razorpay_order_id: {
        type: DataTypes.STRING,
      },

      razorpay_payment_id: {
        type: DataTypes.STRING,
      },

      razorpay_signature: {
        type: DataTypes.STRING,
      },

      payment_status: {
        type: DataTypes.STRING,
        defaultValue: "created", // created, success, failed
      },

    },
    {
      tableName: "donationPayments",
      timestamps: true,
    }
  );

  return Donation;
};
