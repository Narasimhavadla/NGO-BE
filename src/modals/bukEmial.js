const {DataTypes} = require("sequelize")


const createBulkEmail = (sequelize) =>{
    return sequelize.define(
        "BukEmails",{
            id : {
                type : DataTypes.INTEGER,
                autoIncrement : true,
                primaryKey : true
            },
            name : {
                type : DataTypes.STRING,
                allowNull : false
            },
            email : {
                type : DataTypes.STRING,
                allowNull : false
            },
            category : {
                type : DataTypes.STRING,
                allowNull : false
            }
        },
        {
            tableName : "BulkEmails",
            timestamps : true
        }
    )
}

module.exports = createBulkEmail