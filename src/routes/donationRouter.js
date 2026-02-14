const express = require("express")

const router = express.Router()

const controller = require("../controllers/donationController")


const adminDonationsController = require("../controllers/admindonations")

router.get("/donations/all",controller.getAllDonations)
router.get("/donations/:id",controller.getDonationById)
router.post("/donation/add",controller.createDonation)
router.put("/donation/update/:id",controller.updateDonation)
router.delete("/donation/delete/:id",controller.deleteDonation)


router.get("/admin/donations",adminDonationsController.getAllDonations)


module.exports = router