const { deleteActivity } = require("../controllers/deleteActivity");

const deleteActivityHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    await deleteActivity(id);
    res.status(200).send("Activity deleted successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = deleteActivityHandler;
