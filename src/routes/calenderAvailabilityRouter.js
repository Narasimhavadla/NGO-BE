const express = require("express");
const router = express.Router();

const controller = require("../controllers/calenderAvailabilityController");

router.get("/calender/bookings", controller.getAllBookings);
router.get("/calender/bookings/:id", controller.getBookingById);
router.post("/calender/book", controller.createBooking);
router.delete("/calender/delete/:id", controller.deleteBooking);

module.exports = router;