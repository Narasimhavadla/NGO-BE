const sequelize = require("sequelize")

const volunteerController = {

    getAllVolunteers : async (req,res) =>{
        try{

            const volunteers = await req.VolunteerModal.findAll()

            res.status(200).send({
                status : true,
                data : volunteers,
                meta : {total_Volunteers : volunteers.length}
            })
        }
        catch(err){
            res.status(500).send({
                status : false,
                message : `Failed to get ${err.message}`
            })
        }
    },

    getVolunteerById : async (req,res) =>{
        try{

            const volunteer = await req.VolunteerModal.findByPk(req.params.id)

            if(!volunteer) {
                return res.status(401).send({
                    status : false,
                    message : "Volunteer not found"
                })
            }

            res.status(200).send({
                status : true,
                message : "Volunteer Fetched Succesfully",
                data : volunteer
            })
        }
        catch(err){
            res.status(500).send({
                status : false,
                message : `Failed to get by Id ${err.message}`
            })
        }
    },

    createVolunteer  : async (req,res) =>{
        try{
            const {name,email,phone,city,role,description,status} = req.body


            if(!name || !phone){
                return res.status(401).send({
                    status : false,
                    message : "Missing required Fields"
                })
            }

            const volunteer = await req.VolunteerModal.create({
                name,
                email,
                phone,
                city,
                role,
                description,
                status
            })

            res.status(201).send({
                status : true,
                message : "volunteer created succesfully",
                data : volunteer
            })
        }
        catch(err){
            res.status(500).send({
                status : false,
                message : "Failed to create volunteer"
            })
        }
    },

    updateVolunteer : async (req,res) =>{
        try{
            const {name,mail,phone,city,role,description,status} = req.body

            const volunteer = await req.VolunteerModal.findByPk(req.params.id)

            if(!volunteer) {
                return res.status(404).send({
                    status : false,
                    message : "volunteer not found"
                })
            }

            const updateVolunteer = await volunteer.update(
                {
                    name : name ?? volunteer.name,
                    mail : mail ?? volunteer.mail,
                    phone : phone ?? volunteer.phone,
                    city : city ?? volunteer.city,
                    role : role ?? volunteer.role,
                    description : description ?? volunteer.description,
                    status : status ?? volunteer.status
                }
            )

        res.status(200).send({
            status : true,
            message : "Updated Succesfully",
            data : updateVolunteer
        })
        }

        catch(err){
            res.status(500).send({
                status : false,
                message : `Failed to update ${err.message}`
            })
        }
    },




    deleteVolunteer : async (req,res) =>{
        try{

            const volunteer = await req.VolunteerModal.findByPk(req.params.id)

            if(!volunteer){
                return res.status(404).send({
                    status : false,
                    message : "Volunteer not found"
                })
            }

            
            const deletedVolunteer = {...volunteer.dataValues};

            await volunteer.destroy()

            res.status(200).send({
                status : false,
                message : "Volunteer Deleted Succesfully",
                data : deletedVolunteer
            })
        }
        catch(err){
            res.status(500).send({
                status : false,
                message : `Failed to delete ${err.message}`
            })
        }
    }
}


module.exports = volunteerController