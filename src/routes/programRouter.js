const router = require("express").Router();

/* ==============================
   GET ALL PROGRAMS
============================== */
router.get("/programs", async (req, res) => {
  try {
    const programs = await req.Program.findAll({
      order: [["startDate", "ASC"]],
    });

    res.json(programs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch programs" });
  }
});

/* ==============================
   ADD PROGRAM
============================== */
router.post("/programs", async (req, res) => {
  try {
    const program = await req.Program.create(req.body);
    res.json(program);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create program" });
  }
});

/* ==============================
   UPDATE PROGRAM
============================== */
router.put("/programs/:id", async (req, res) => {
  try {
    await req.Program.update(req.body, {
      where: { id: req.params.id },
    });

    res.json({ message: "Program updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
});

/* ==============================
   DELETE PROGRAM
============================== */
router.delete("/programs/:id", async (req, res) => {
  try {
    await req.Program.destroy({
      where: { id: req.params.id },
    });

    res.json({ message: "Program deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;
