const { Op } = require("sequelize");
const sendBookingEmail = require("../utils/sendBookingEmail");

const calenderAvailabilityController = {

  // ✅ Get All Booked Slots
  getAllBookings: async (req, res) => {
    try {
      const bookings = await req.CalenderAvailabilityModal.findAll({
        order: [["date", "ASC"]],
      });

      res.status(200).send({
        status: true,
        message: "Fetched Successfully",
        data: bookings,
        meta: {
          total_count: bookings.length,
        },
      });
    } catch (err) {
      res.status(500).send({
        status: false,
        message: `Failed to fetch bookings ${err.message}`,
      });
    }
  },

  // ✅ Create Booking
  createBooking: async (req, res) => {
    try {
      const {
          name,
          phone,
          email,
          date,
          time,
          occasion,
          customOccasion,
          programType,
          customProgram,
          message,
        } = req.body;

      if (!name || !phone || !date || !time) {
        return res.status(400).send({
          status: false,
          message: "Required Fields Missing",
        });
      }

      // 🚨 Prevent Double Booking (Same Date + Same Time)
      const existing = await req.CalenderAvailabilityModal.findOne({
        where: {
          date,
          time,
        },
      });

      if (existing) {
        return res.status(400).send({
          status: false,
          message: "This slot is already booked",
        });
      }

      const booking = await req.CalenderAvailabilityModal.create({
        name,
        phone,
        email,
        date,
        time,
        occasion,
        customOccasion,
        programType,
        customProgram,
        message,
      });

      // ✅ Send email if email exists
      if (email) {
        await sendBookingEmail(booking);
      }
      
      res.status(201).send({
        status: true,
        message: "Booking Created Successfully",
        data: booking,
      });

    } catch (err) {
      res.status(500).send({
        status: false,
        message: `Failed to create booking ${err.message}`,
      });
    }
  },

  // ✅ Get Booking By ID
  getBookingById: async (req, res) => {
    try {
      const booking = await req.CalenderAvailabilityModal.findByPk(req.params.id);

      if (!booking) {
        return res.status(404).send({
          status: false,
          message: "Booking Not Found",
        });
      }

      res.status(200).send({
        status: true,
        message: "Fetched Successfully",
        data: booking,
      });

    } catch (err) {
      res.status(500).send({
        status: false,
        message: `Failed ${err.message}`,
      });
    }
  },

  // ✅ Delete Booking
  deleteBooking: async (req, res) => {
    try {
      const booking = await req.CalenderAvailabilityModal.findByPk(req.params.id);

      if (!booking) {
        return res.status(404).send({
          status: false,
          message: "Booking Not Found",
        });
      }

      await booking.destroy();

      res.status(200).send({
        status: true,
        message: "Deleted Successfully",
      });

    } catch (err) {
      res.status(500).send({
        status: false,
        message: `Failed to delete ${err.message}`,
      });
    }
  },
};

module.exports = calenderAvailabilityController;