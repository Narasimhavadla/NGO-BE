const sequelize = require("sequelize")

const {DataTypes} = require("sequelize")

const createVolunteer = (sequelize) =>{
    return sequelize.define(
        "Volunteer",{
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
            city : {
                type : DataTypes.STRING,
                allowNull : false
            },
            role : {
                type : DataTypes.STRING,
                allowNull : true
            },
            description : {
                type : DataTypes.STRING,
                allowNull : true
            },
            status : {
                type : DataTypes.STRING,
                allowNull : null
            }
        },
        {
            tableName : "Volunteer",
            timestamps : true
        }
    )
}


module.exports = createVolunteer