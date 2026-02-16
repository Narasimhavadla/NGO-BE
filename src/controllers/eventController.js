const fs = require("fs");
const path = require("path");
const { QueryTypes, } = require("sequelize");
const sequelize = require("../config/db"); 
const cloudinary = require("../config/cloudinary");


const eventController = {


createEvent: async (req, res) => {
  try {
    const {
      title,
      dateOfEvent,
      time,
      location,
      participants,
      content,
      status,
    } = req.body;

    if (!title || !dateOfEvent) {
      return res.status(400).send({
        status: false,
        message: "Required fields are missing",
      });
    }

    // 🌩️ Cloudinary Image URL
    const imageUrl = req.file ? req.file.path : null;

    const event = await req.EventsModel.create({
      title,
      dateOfEvent,
      time,
      location,
      participants,
      content,
      status,
      image: imageUrl,
    });

    res.status(201).send({
      status: true,
      message: "Event created successfully",
      data: event,
    });

  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: false,
      message: err.message,
    });
  }
},



  // ✅ GET ALL
  getAllEvents: async (req, res) => {
    try {
      const events = await sequelize.query(
        "SELECT * FROM Events ORDER BY ID DESC",{
          type : QueryTypes.SELECT
        }
      )

      res.send({
        status: true,
        data: events,
        meta : {total_events : events.length}
      });

    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: false,
        message: "Failed to fetch events",
      });
    }
  },

  // ✅ GET SINGL

getSingleEvent: async (req, res) => {
  try {
    const { id } = req.params;

    const event = await sequelize.query(
      "SELECT * FROM Events WHERE id = :id",
      {
        replacements: { id },
        type: QueryTypes.SELECT,
      }
    );

    if (!event || event.length === 0) {
      return res.status(404).send({
        status: false,
        message: "Event not found",
      });
    }

    res.send({
      status: true,
      data: event[0],
    });

  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: false,
      message: "Failed to fetch event",
    });
  }
},

updateEvent: async (req, res) => {
  try {
    const { id } = req.params;

    const event = await req.EventsModel.findByPk(id);

    if (!event) {
      return res.status(404).send({
        status: false,
        message: "Event not found",
      });
    }

    let imageUrl = event.image;

    // 📸 If new image uploaded
    if (req.file) {

      // 🔥 Delete old image from Cloudinary
      if (event.image) {
        const publicId = event.image
          .split("/")
          .pop()
          .split(".")[0];

        await cloudinary.uploader.destroy(
          `ngo_uploads/${publicId}`
        );
      }

      imageUrl = req.file.path;
    }

    await event.update({
      ...req.body,
      image: imageUrl,
    });

    res.send({
      status: true,
      message: "Event updated successfully",
      data: event,
    });

  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: false,
      message: err.message,
    });
  }
},


 
  deleteEvent: async (req, res) => {
  try {
    const { id } = req.params;

    const event = await req.EventsModel.findByPk(id);

    if (!event) {
      return res.status(404).send({
        status: false,
        message: "Event not found",
      });
    }

    // 🔥 Delete image from Cloudinary
    if (event.image) {
      const publicId = event.image
        .split("/")
        .pop()
        .split(".")[0];

      await cloudinary.uploader.destroy(
        `ngo_uploads/${publicId}`
      );
    }

    await event.destroy();

    res.send({
      status: true,
      message: "Event deleted successfully",
    });

  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: false,
      message: err.message,
    });
  }
},

};

module.exports = eventController;
