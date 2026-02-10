const express = require("express");
const router = express.Router();

const controller = require("../controllers/eventController");
const upload = require("../middleware/upload");

// CREATE
router.post(
  "/event/register",
  upload.single("image"),
  controller.createEvent
);

// GET ALL
router.get("/events", controller.getAllEvents);

// GET ONE
router.get("/event/:id", controller.getSingleEvent);

// UPDATE
router.put(
  "/event/:id",
  upload.single("image"),
  controller.updateEvent
);

// DELETE
router.delete("/event/:id", controller.deleteEvent);

module.exports = router;
