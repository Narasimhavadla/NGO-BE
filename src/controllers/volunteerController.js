const sequelize = require("sequelize")
const generateVolunteerCard = require("../utils/generateVolunteerCard");
const uploadIdCardToCloudinary = require("../utils/uploadIdCardToCloudinary");
const sendVolunteerEmail = require("../utils/sendVolunteerEmail");



const cloudinary = require("../config/cloudinary");

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

   createVolunteer: async (req, res) => {
  try {
    const { name, email, phone, city, role, description, status } = req.body;

    if (!name || !phone) {
      return res.status(400).send({
        status: false,
        message: "Missing required fields",
      });
    }

    // ✅ Cloudinary image URL
    const imageUrl = req.file ? req.file.path : null;

    const volunteer = await req.VolunteerModal.create({
      name,
      email,
      phone,
      city,
      role,
      description,
      status,
      image: imageUrl,
    });

    res.status(201).send({
      status: true,
      message: "Volunteer created successfully",
      data: volunteer,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: `Failed to create volunteer ${err.message}`,
    });
  }
},

 updateVolunteer: async (req, res) => {
  try {
    const { name, email, phone, city, role, description, status } = req.body;

    const volunteer = await req.VolunteerModal.findByPk(req.params.id);

    if (!volunteer) {
      return res.status(404).send({
        status: false,
        message: "Volunteer not found",
      });
    }

    let imageUrl = volunteer.image;

    // ✅ If new image uploaded
    if (req.file) {
      // Delete old image from cloudinary
      if (volunteer.image) {
        const publicId = volunteer.image
          .split("/")
          .pop()
          .split(".")[0];

        await cloudinary.uploader.destroy(
          `ngo_uploads/${publicId}`
        );
      }

      // Save new image
      imageUrl = req.file.path;
    }

    const updatedVolunteer = await volunteer.update({
      name: name ?? volunteer.name,
      email: email ?? volunteer.email,
      phone: phone ?? volunteer.phone,
      city: city ?? volunteer.city,
      role: role ?? volunteer.role,
      description: description ?? volunteer.description,
      status: status ?? volunteer.status,
      image: imageUrl,
    });

    res.status(200).send({
      status: true,
      message: "Updated successfully",
      data: updatedVolunteer,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: `Failed to update ${err.message}`,
    });
  }
},


   deleteVolunteer: async (req, res) => {
  try {
    const volunteer = await req.VolunteerModal.findByPk(
      req.params.id
    );

    if (!volunteer) {
      return res.status(404).send({
        status: false,
        message: "Volunteer not found",
      });
    }

    // ✅ Delete image from cloudinary
    if (volunteer.image) {
      const publicId = volunteer.image
        .split("/")
        .pop()
        .split(".")[0];

      await cloudinary.uploader.destroy(
        `ngo_uploads/${publicId}`
      );
    }

    const deletedVolunteer = {
      ...volunteer.dataValues,
    };

    await volunteer.destroy();

    res.status(200).send({
      status: true,
      message: "Volunteer deleted successfully",
      data: deletedVolunteer,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: `Failed to delete ${err.message}`,
    });
  }
},

updateVolunteerStatus: async (req, res) => {
  try {
    const { status } = req.body;

    const volunteer =
      await req.VolunteerModal.findByPk(
        req.params.id
      );

    if (!volunteer) {
      return res.status(404).send({
        status: false,
        message: "Volunteer not found",
      });
    }

    const oldStatus = volunteer.status;

    // Update only status
    volunteer.status = status;
    await volunteer.save();

    // 🎯 Trigger only if pending → active
    if (
      oldStatus === "pending" &&
      status === "active"
    ) {
      // Generate Volunteer ID
      const volunteerId = `VOL-${Date.now()}`;

      volunteer.volunteerId = volunteerId;
      await volunteer.save();

      // Generate ID Card
      const filePath =
        await generateVolunteerCard(volunteer);

      // Upload to Cloudinary
      const idCardUrl =
        await uploadIdCardToCloudinary(filePath);

      volunteer.idCardUrl = idCardUrl;
      await volunteer.save();

      // Send Email
      await sendVolunteerEmail(
        volunteer,
        idCardUrl
      );
    }

    res.status(200).send({
      status: true,
      message: "Status updated successfully",
      data: volunteer,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: err.message,
    });
  }
},


}


module.exports = volunteerController