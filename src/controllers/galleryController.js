const sequelize = require("../config/db");
const { QueryTypes } = require("sequelize");
const cloudinary = require("../config/cloudinary");

const galleryController = {

  // ✅ UPLOAD IMAGE
  uploadImage: async (req, res) => {
    try {
      const { category } = req.body;

      if (!req.file) {
        return res.status(400).send({
          status: false,
          message: "Image is required",
        });
      }

      if (!category) {
        return res.status(400).send({
          status: false,
          message: "Category is required",
        });
      }

      const imageUrl = req.file.path;

      const image = await req.GalleryModal.create({
        image: imageUrl,
        category,
      });

      res.send({
        status: true,
        message: "Image uploaded",
        data: image,
      });

    } catch (err) {
      res.status(500).send({
        status: false,
        message: err.message,
      });
    }
  },

  // ✅ GET ALL
  getAllImages: async (req, res) => {
    try {
      const images = await sequelize.query(
        "SELECT * FROM Gallery ORDER BY id DESC",
        { type: QueryTypes.SELECT }
      );

      res.send({
        status: true,
        data: images,
      });

    } catch (err) {
      res.status(500).send({
        status: false,
        message: err.message,
      });
    }
  },

  // ✅ DELETE
  deleteImage: async (req, res) => {
    try {
      const { id } = req.params;

      const image = await req.GalleryModal.findByPk(id);

      if (!image) {
        return res.status(404).send({
          status: false,
          message: "Image not found",
        });
      }

      // 🔥 Delete from Cloudinary
      const publicId = image.image
        .split("/")
        .pop()
        .split(".")[0];

      await cloudinary.uploader.destroy(
        `ngo_uploads/${publicId}`
      );

      await image.destroy();

      res.send({
        status: true,
        message: "Image deleted",
      });

    } catch (err) {
      res.status(500).send({
        status: false,
        message: err.message,
      });
    }
  },

};

module.exports = galleryController;
