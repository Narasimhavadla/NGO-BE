const {sequelize,DataTypes }= require("sequelize")


const createDonation = (sequelize) =>{
    return sequelize.define(
        "Donation",{
            id : {
                type : DataTypes.INTEGER,
                primaryKey : true,
                autoIncrement : true
            },
            name : {
                type : DataTypes.STRING,
                allowNull : false
            },
            email : {
                type : DataTypes.STRING,
                allowNull : false
            },
            phone : {
                type : DataTypes.STRING,
                allowNull : false
            },
            amount : {
                type : DataTypes.STRING,
                allowNull : false
            },
            donationFor : {
                type : DataTypes.STRING,
                allowNull : true
            }
        },
        {
            tableName : "Donations",
            timestamps : true
        }
    )
}

module.exports = createDonation