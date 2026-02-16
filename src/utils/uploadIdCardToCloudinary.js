const cloudinary = require("../config/cloudinary");

const uploadIdCardToCloudinary = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "ngo_id_cards",
  });

  return result.secure_url;
};

module.exports = uploadIdCardToCloudinary;
