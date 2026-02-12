const express = require("express")

const router = express.Router()

const controller = require("../controllers/volunteerController")

router.get("/volunteers",controller.getAllVolunteers)
router.get("/volunteer/:id",controller.getVolunteerById)
router.post("/volunteer",controller.createVolunteer)
router.put("/volunteer/:id",controller.updateVolunteer)
router.delete("/volunteer/:id",controller.deleteVolunteer)



module.exports = router