const deleteActivity = require("../controllers/deleteActivities");

const deleteActivityHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteActivity(id);
    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteActivityHandler;
