const fs = require("fs");
const path = require("path");
const { QueryTypes, } = require("sequelize");
const sequelize = require("../config/db"); 

const eventController = {

  // ✅ CREATE EVENT
 createEvent: async (req, res) => {
  try {
    const { title, dateOfEvent, location, participants, content, status } = req.body;

    if (!title || !dateOfEvent) {
      return res.status(400).send({
        status: false,
        message: "Required fields are missing",
      });
    }

    const imagePath = req.file ? req.file.filename : null;

    const event = await sequelize.query(
      `INSERT INTO Events
       (title, dateOfEvent, location, participants, content, image, createdAt, updatedAt, status)
       VALUES
       (:title, :dateOfEvent, :location, :participants, :content, :image, NOW(), NOW(), :status)`,
      {
        replacements: {
          title,
          dateOfEvent,
          location,
          participants,
          content,
          image: imagePath,
          status,
        },
        type: QueryTypes.INSERT,
      }
    );

    res.status(201).send({
      status: true,
      message: "Event created successfully",
      data: event,
    });

  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: false,
      message: "Failed to create event",
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


  // ✅ UPDATE EVENT
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

      let imagePath = event.image;

      // If new image uploaded → delete old image
      if (req.file) {

        if (event.image) {
          const oldImagePath = path.join(
            __dirname,
            "../uploads",
            event.image
          );

          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }

        imagePath = req.file.filename;
      }

      await event.update({
        ...req.body,
        image: imagePath,
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
        message: "Failed to update event",
      });
    }
  },

  // ✅ DELETE EVENT + IMAGE
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

      // 🔥 Delete image from folder
      if (event.image) {
        const imagePath = path.join(
          __dirname,
          "../uploads",
          event.image
        );

        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      // Delete DB record
      await event.destroy();

      res.send({
        status: true,
        message: "Event deleted successfully",
      });

    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: false,
        message: "Failed to delete event",
      });
    }
  },
};

module.exports = eventController;
