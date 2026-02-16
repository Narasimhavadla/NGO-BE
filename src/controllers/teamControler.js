const fs = require("fs");
const path = require("path");
const { QueryTypes, } = require("sequelize");
const sequelize = require("../config/db"); 
const cloudinary = require("../config/cloudinary");


const teamController = {

    createMember : async (req, res) => {
  try {
    const { name, designation, email, phone } = req.body;

    const imageUrl = req.file ? req.file.path : null;

    const member = await req.TeamModal.create({
      name,
      designation,
      email,
      phone,
      image: imageUrl, 
    });

    res.send({
      status: true,
      message: "Member added",
      data: member,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }},

  // ✅ GET ALL TEAM
  getAllTeam: async (req, res) => {
    try {
      const team = await req.TeamModal.findAll({
        order: [
            ["isPinned", "DESC"], // pinned first
            ["id", "DESC"],       // latest next
          ],

      });

      res.send({
        status: true,
        data: team,
        total: team.length,
      });

    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: false,
        message: "Failed to fetch team",
      });
    }
  },

  // ✅ GET SINGLE TEAM
  getSingleTeam: async (req, res) => {
    try {
      const { id } = req.params;

      const team = await req.TeamModal.findByPk(id);

      if (!team) {
        return res.status(404).send({
          status: false,
          message: "Team member not found",
        });
      }

      res.send({
        status: true,
        data: team,
      });

    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: false,
        message: "Failed to fetch team member",
      });
    }
  },

  // ✅ UPDATE TEAM (WITH IMAGE REPLACE)
  updateTeam: async (req, res) => {
    try {
      const { id } = req.params;

      const team = await req.TeamModal.findByPk(id);

      if (!team) {
        return res.status(404).send({
          status: false,
          message: "Team member not found",
        });
      }

      let imagePath = team.image;

      // 📸 If new image uploaded
      if (req.file) {

        // Delete old image
        if (team.image) {
          const oldImagePath = path.join(
            __dirname,
            "../uploads",
            team.image
          );

          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }

        imagePath = req.file.filename;
      }

      await team.update({
        ...req.body,
        image: imagePath,
      });

      res.send({
        status: true,
        message: "Team member updated",
        data: team,
      });

    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: false,
        message: "Failed to update team",
      });
    }
  },

 
  deleteMember : async (req, res) => {
  const member = await req.TeamModal.findByPk(req.params.id);

  if (member.image) {
    const publicId = member.image.split("/").pop().split(".")[0];

    await cloudinary.uploader.destroy(`ngo_uploads/${publicId}`);
  }

  await member.destroy();

  res.send({ status: true, message: "Deleted" });
},

// ✅ PIN / UNPIN TEAM MEMBER
togglePinMember: async (req, res) => {
  try {
    const { id } = req.params;

    const member = await req.TeamModal.findByPk(id);

    if (!member) {
      return res.status(404).send({
        status: false,
        message: "Member not found",
      });
    }

    // Toggle value
    member.isPinned = !member.isPinned;
    await member.save();

    res.send({
      status: true,
      message: member.isPinned
        ? "Pinned to top"
        : "Unpinned",
      data: member,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
},


};

module.exports = teamController;
