const {DataTypes} = require("sequelize")


const createCalenderAvailability = (sequelize) =>{
    return sequelize.define(
        "calenderAvailability",{
            id : {
                type : DataTypes.INTEGER,
                autoIncrement : true,
                primaryKey : true
            },
            name : {
                type : DataTypes.STRING,
                allowNull : false
            },
            phone : {
                type : DataTypes.STRING,
                allowNull : false
            },
            email : {
                type : DataTypes.STRING,
                allowNull : true
            },
            date : {
                type : DataTypes.DATE,
                allowNull : false
            },
            time : {
                type : DataTypes.TIME,
                 allowNull: false
            },
            occasion : {
                type : DataTypes.STRING,
                allowNull : true
            },
            customOccasion : {
                type : DataTypes.STRING,
                allowNull : true
            },
            programType : {
                type : DataTypes.STRING,
                allowNull : true
            },
            customProgram : {
                type : DataTypes.STRING,
                allowNull : true
            },
            message : {
                type : DataTypes.STRING,
                allowNull : true
            }
            },
            {
                tableName : "calenderAvailability",
                timestamps : true
            }
    )
}


module.exports = createCalenderAvailability