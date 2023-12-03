// deleteActivity.js
const { Activity } = require("../db");

const deleteActivity = async (id) => {
  try {
    await Activity.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { deleteActivity };
