const {sequelize,DataTypes} = require("sequelize")

const creatEvents = (sequelize) =>{
    return sequelize.define(
        "Events",{
            id : {
                type : DataTypes.INTEGER,
                autoIncrement : true,
                primaryKey : true
            },
            title : { 
                type : DataTypes.STRING,
                allowNull : false
            },
             time: {
                type: DataTypes.TIME,
                allowNull: true,
            },
            dateOfEvent : {
                type : DataTypes.DATE,
                allowNull : false
            },
            location : {
                type :DataTypes.STRING,
                allowNull : true
            },
            participants : {
                type : DataTypes.STRING,
                allowNull : true
            },
            image :{
                type : DataTypes.STRING,
                allowNull : true
            },
            content : {
                type : DataTypes.STRING,
                allowNull : true
            },
            status : {
                type : DataTypes.STRING,
                allowNull : false
            },
            // donationFor : {
            //     type : DataTypes.STRING,
            //     allowNull : true
            // }
        },
        {
            tableName : "Events",
            timestamps : true
        }
    )
}


module.exports = creatEvents