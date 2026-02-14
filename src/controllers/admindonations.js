const { Op } = require("sequelize");

const adminDonationsController = {
  getAllDonations: async (req, res) => {
    try {

      const donationPayment = await req.DonationPaymentModal.findAll();

      const donorsCount = await req.DonationPaymentModal.count();

      const startOfMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      );

      const today = new Date();

      const monthlyTotal = await req.DonationPaymentModal.sum("amount", {
        where: {
          createdAt: {
            [Op.between]: [startOfMonth, today],
          },
        },
      });

      res.status(200).send({
        status: true,
        message: "Fetched payments successfully",
        data: donationPayment,
        meta: {
          total_count: donationPayment.length,
          donorsCount: donorsCount,
          monthlyTotal: monthlyTotal || 0
        },
      });

    } catch (err) {
      res.status(500).send({
        status: false,
        message: `Failed to fetch payments ${err.message}`,
      });
    }
  },
};

module.exports = adminDonationsController;
