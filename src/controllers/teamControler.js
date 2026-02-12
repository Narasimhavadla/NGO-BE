const sequelize = require("sequelize")

const teamController = {

createTeam : async (req,res) =>{
    try{    

        const {name,designation,image,phone,email} = req.body


        // const team = await req.TeamModal.create({
        //     name,
        //     designation,
        //     phone,
        //     email,
        //     image
        // })

    }
    catch(err){
        res.status(500).send({
            status : false,
            message : `Failed to create ${err.message}`
        })
    }
}

}

module.exports = teamController