const { Activity } = require("../db");

const deleteActivity = async (id) => {
  await Activity.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = deleteActivity;
