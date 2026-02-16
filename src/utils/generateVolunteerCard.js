const { createCanvas, loadImage } = require("canvas");
const QRCode = require("qrcode");
const cloudinary = require("../config/cloudinary");

const generateVolunteerCard = async (volunteer) => {
  const width = 900;
  const height = 500;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  /**
   * 🎨 Background
   */
  ctx.fillStyle = "#f3f4f6";
  ctx.fillRect(0, 0, width, height);

  /**
   * 🔵 Header
   */
  ctx.fillStyle = "#2563eb";
  ctx.fillRect(0, 0, width, 120);

  ctx.fillStyle = "#fff";
  ctx.font = "bold 40px Arial";
  ctx.fillText("Dhatrutha Being a Giver", 30, 70);

  ctx.font = "20px Arial";
  ctx.fillText("Volunteer Access Badge", 30, 105);

  /**
   * 👤 Volunteer Image
   */
  if (volunteer.image) {
    const img = await loadImage(volunteer.image);
    ctx.drawImage(img, 40, 160, 150, 150);
  }

  /**
   * 📄 Details
   */
  ctx.fillStyle = "#000";
  ctx.font = "28px Arial";
  ctx.fillText(volunteer.name, 230, 190);

  ctx.font = "20px Arial";
  ctx.fillText(volunteer.role || "Volunteer", 230, 230);
  ctx.fillText(`ID: ${volunteer.volunteerId}`, 230, 270);
  ctx.fillText(volunteer.phone, 230, 310);
  ctx.fillText(volunteer.email, 230, 350);
  ctx.fillText(volunteer.city, 230, 390);

  /**
   * 🔳 QR CODE
   */
  const qrData = JSON.stringify({
    id: volunteer.volunteerId,
    name: volunteer.name,
    phone: volunteer.phone,
  });

  const qrImage = await QRCode.toDataURL(qrData);
  const qr = await loadImage(qrImage);

  ctx.drawImage(qr, 680, 200, 150, 150);

  /**
   * ✅ Convert canvas → BUFFER
   */
  const buffer = canvas.toBuffer("image/png");

  /**
   * ☁️ Upload DIRECTLY to Cloudinary
   */
  const uploadResult = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "ngo_id_cards",
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(buffer);
  });

  return uploadResult.secure_url;
};

module.exports = generateVolunteerCard;
