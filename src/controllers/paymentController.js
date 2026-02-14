const razorpay = require("../config/razorpay");
const crypto = require("crypto");

const db = require("../modals");
const Donation = db.DonationPaymentModal;

/* -------------------------------------------------- */
/* CREATE ORDER */
/* -------------------------------------------------- */

exports.createOrder = async (req, res) => {
  try {
    const {
      donorName,
      donorPhone,
      donorEmail,
      amount,
      donationFor,
    } = req.body;

    if (!donorName || !donorPhone || !amount) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const receiptId = `receipt_${Date.now()}`;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: receiptId,
    };

    // ✅ Create Razorpay order
    const order = await razorpay.orders.create(options);

    // ✅ Save donation (CREATED STATUS)
    await Donation.create({
      donorName,
      donorPhone,
      donorEmail,
      amount,
      donationFor,
      razorpay_order_id: order.id,
      payment_status: "created",
    });

    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Order creation failed",
    });
  }
};


exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {

      /* -------------------------------------- */
      /* 🆕 FETCH PAYMENT DETAILS FROM RAZORPAY */
      /* -------------------------------------- */

      const payment = await razorpay.payments.fetch(
        razorpay_payment_id
      );

      const paymentMethod = payment.method; // upi / card / netbanking

      /* -------------------------------------- */
      /* UPDATE DB */
      /* -------------------------------------- */

      await Donation.update(
        {
          razorpay_payment_id,
          razorpay_signature,
          payment_status: "success",
          payment_method: paymentMethod, // 🆕 SAVE
        },
        {
          where: { razorpay_order_id },
        }
      );

      res.json({
        success: true,
        payment_method: paymentMethod,
        message: "Payment verified & updated",
      });

    } else {

      await Donation.update(
        { payment_status: "failed" },
        { where: { razorpay_order_id } }
      );

      res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Verification failed",
    });
  }
};


exports.addOfflineDonation = async (req, res) => {
  try {
    
    const {
      donorName,
      donorPhone,
      donorEmail,
      amount,
      donationFor,
      payment_method,
      payment_status
    } = req.body


    const donation = await Donation.create({
      donorName,
      donorPhone,
      donorEmail,
      amount,
      donationFor,
      payment_method,
      razorpay_order_id : 0,
      razorpay_payment_id :0,
      razorpay_signature : 0,
      payment_status
  });

    res.send({
      success: true,
      message: "Offline donation added",
      data: donation,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};
