// const multer = require("multer");
// const path = require("path");

// // Storage config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../uploads"));
//   },

//   // Keep original file name
//   filename: (req, file, cb) => {
//     const originalName = file.originalname.replace(/\s+/g, "");
//     cb(null, originalName);
//   },
// });

// // File filter (only images)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|webp/;

//   const ext = allowedTypes.test(
//     path.extname(file.originalname).toLowerCase()
//   );

//   if (ext) cb(null, true);
//   else cb(new Error("Only images are allowed"));
// };

// const upload = multer({ storage, fileFilter });

// module.exports = upload;

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ngo_uploads",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

module.exports = upload;

