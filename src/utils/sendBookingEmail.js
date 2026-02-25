const nodemailer = require("nodemailer");
const path = require("path");

const sendBookingEmail = async (booking) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const formattedDate = new Date(booking.date).toDateString();

    const mailOptions = {
      from: `"Dhatruth Organization" <${process.env.EMAIL_USER}>`,
      to: booking.email,
      subject: "Program Booking Confirmation 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          
          <!-- ✅ Banner Image -->
          <img src="cid:bannerImage" 
               style="width:100%; max-height:200px; object-fit:cover; border-radius:10px;" />

          <h2 style="color:#254151;">Hello ${booking.name},</h2>

          <p>Your program booking has been successfully confirmed.</p>

          <div style="background:#f3f4f6; padding:15px; border-radius:10px;">
            <h3>Booking Details:</h3>
            <ul>
              <li><strong>Date:</strong> ${formattedDate}</li>
              <li><strong>Time:</strong> ${booking.time}</li>
              <li><strong>Occasion:</strong> ${booking.occasion || "N/A"}</li>
              <li><strong>Program Type:</strong> ${booking.programType || "N/A"}</li>
              <li><strong>Message:</strong> ${booking.message || "None"}</li>
            </ul>
          </div>

          <p style="margin-top:20px;">
            Our team will contact you soon for further coordination.
          </p>

          <p>Thank you for choosing Dhatruttha 🙏</p>

        </div>
      `,
      attachments: [
        {
          filename: "email-banner.png",
          path: path.join(__dirname, "../assets/dhatruthaLogo.webp"),
          cid: "bannerImage", 
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    console.log("Booking confirmation email sent successfully");
  } catch (error) {
    console.error("Email sending failed:", error.message);
  }
};

module.exports = sendBookingEmail;