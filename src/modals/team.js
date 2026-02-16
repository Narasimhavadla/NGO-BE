const {sequelize,DataTypes, DATE} = require("sequelize")

const createTeam = (sequelize) =>{
    return sequelize.define(
        "Team",{
            id : {
                type : DataTypes.INTEGER,
                primaryKey : true,
                autoIncrement : true
            },
            name : {
                type : DataTypes.STRING,
                allowNull : false
            },
            designation : {
                type : DataTypes.STRING,
                allowNull : false
            },
            image : {
                type : DataTypes.STRING,
                allowNull : true
            },
            phone : {
                type :DataTypes.STRING,
                allowNull : false
            },
            email : {
                type : DataTypes.STRING,
                allowNull : true
            },
            isPinned : {
                type : DataTypes.BOOLEAN,
                defaultValue : false
            }

        },
        {
            tableName : "Team",
            timestamps : true
        }
    )
}

module.exports = createTeam
