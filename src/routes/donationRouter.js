const express = require("express")

const router = express.Router()

const controller = require("../controllers/donationController")

router.get("/donations/all",controller.getAllDonations)
router.get("/donations/:id",controller.getDonationById)
router.post("/donation/add",controller.createDonation)
router.put("/donation/update/:id",controller.updateDonation)
router.delete("/donation/delete/:id",controller.deleteDonation)



module.exports = router