const sequelize = require("sequelize")
const { param } = require("../routes/donationRouter")

const donationController = {

    getAllDonations : async (req,res) =>{
        try{
            const donation  = await req.DonationModal.findAll()

            res.status(200).send({
                status : true,
                message : "Fetched Succesfully",
                data : donation,
                meta : {
                    total_count : donation.length
                }
            })
        }
        catch(err){
            res.status(500).send({
                status : false,
                message : "Failed to get All Donations"
            })
        }
    },

    createDonation : async (req,res) =>{
        try{
            const {name,email,phone,amount , donationFor} = req.body

            if(!name || !email || !phone || !amount){
                return res.status(400).send({
                    status : false,
                    message : "Required Fields are Missing"
            })

            }

            const donation = await req.DonationModal.create({
                name,
                email,
                phone,
                amount,
                donationFor
        })


            res.status(201).send({
                status : true,
                message : "Donation Created Succesfully",
                data : donation
            })
        }
        catch(err){
            res.status(500).send({
                status : false,
                message : `Failed to create ${err.message}`
            })
        }
    },

    getDonationById : async (req,res) =>{
        try{

            const donation = await req.DonationModal.findByPk(req.params.id)


            if(!donation){
                return res.status(404).send({
                    status : false,
                    message : "Donation not found"
                })
            }

            res.status(200).send({
                status : true,
                message : "Fetched by Id Succesfully",
                data : donation
            })
        }
        catch(err){
            res.status(500).send({
                status : false,
                message : `Failed to get by Id ${err.message}`
            })
        }
    },


    updateDonation : async (req,res) =>{
        try{

            const {name,email,phone,amount,donationFor} = req.body

            const donation = await req.DonationModal.findByPk(req.params.id)

            if(!donation){
                return res.status(404).send({
                    status : false,
                    message : "Donation not found"
                })
            }

            const updateDonation = await donation.update({
                name : name ?? donation.name,
                email : email ?? donation.email,
                phone : phone ?? donation.phone,
                amount : amount ?? donation.amount,
                donationFor : donationFor ?? donation.donationFor
            })

            res.status(200).send({
                status : false,
                message : "Updated Succesfully",
                data : updateDonation
            })
        }
        catch(err){
            res.status(500).send({
                status : false,
                message : `Failed to update ${err.message}`
            })
        }

    },
    

    deleteDonation : async (req,res) =>{
        try{

            const donation = await req.DonationModal.findByPk(req.params.id)

            if(!donation){
                return res.status(404).send({
                    status : false,
                    message : "Donation not found"
                })
            }

            const deleteDonation = {...donation.dataValues}
            await donation.destroy()

            res.status(200).send({
                status : false,
                message : "Deleted Succesfully",
                data : deleteDonation
            })
        }
        catch(err){
            res.status(500).send({
                status : false,
                message : `Failed to Delete ${err.message}`
            })
        }

    }




}

module.exports = donationController