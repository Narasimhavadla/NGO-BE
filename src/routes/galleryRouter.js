const express = require("express");
const router = express.Router();

const controller = require("../controllers/galleryController");
const upload = require("../middleware/upload");

// UPLOAD
router.post(
  "/gallery/upload",
  upload.single("image"),
  controller.uploadImage
);

// GET
router.get("/gallery", controller.getAllImages);

// DELETE
router.delete("/gallery/:id", controller.deleteImage);

module.exports = router;
