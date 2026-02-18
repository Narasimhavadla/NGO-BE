// controllers/dashboardController.js

// const { DonationModal, VolunteerModal, EventsModel } = require("../modals");
// const { Sequelize } = require("sequelize");

exports.getDashboardStats = async (req, res) => {
  try {
    // 🔹 Total Donation Amount
    const totalDonationAmount = await req.DonationPaymentModal.sum("amount");

    // 🔹 Total Donors Count
    const totalDonors = await req.DonationPaymentModal.count();

    // 🔹 Total Volunteers
    const totalVolunteers = await req.VolunteerModal.count();

    // 🔹 Total Events
    const totalEvents = await req.EventsModel.count();

    // 🔹 Recent 5 Donations
    const recentDonations = await req.DonationPaymentModal.findAll({
      order: [["createdAt", "DESC"]],
      limit: 5,
      attributes: ["id", "donorName", "donorPhone", "amount","createdAt", "payment_method","payment_status","donationFor" ],
    });

    res.json({
      totalDonationAmount: totalDonationAmount || 0,
      totalDonors,
      totalVolunteers,
      totalEvents,
      recentDonations,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
