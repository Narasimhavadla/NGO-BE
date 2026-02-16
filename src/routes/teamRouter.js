const express = require("express");
const router = express.Router();

const teamController = require("../controllers/teamControler");
const upload = require("../middleware/upload");
 

router.post(
  "/team/add",
  upload.single("image"),
  teamController.createMember
);

// GET ALL
router.get("/team", teamController.getAllTeam);

// GET SINGLE
router.get("/team/:id", teamController.getSingleTeam);

// UPDATE
router.put(
  "/team/:id",
  upload.single("image"),
  teamController.updateTeam
);

// DELETE
router.delete("/team/:id", teamController.deleteMember);

// PIN / UNPIN
router.put("/team/pin/:id", teamController.togglePinMember);


module.exports = router;
