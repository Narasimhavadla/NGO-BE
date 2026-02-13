const express = require("express");
const router = express.Router();
const controller = require("../controllers/volunteerController");
const upload = require("../middleware/upload"); // multer-cloudinary

router.get("/volunteers", controller.getAllVolunteers);
router.get("/volunteer/:id", controller.getVolunteerById);

router.post(
  "/volunteer",
  upload.single("image"),   // ✅ upload image
  controller.createVolunteer
);

router.put(
  "/volunteer/:id",
  upload.single("image"),   // ✅ replace image
  controller.updateVolunteer
);

router.delete(
  "/volunteer/:id",
  controller.deleteVolunteer
);

module.exports = router;
