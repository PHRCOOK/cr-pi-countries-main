const { Activity } = require("../models");

const getAllActivities = async (req, res) => {
  try {
    // Recupera todas las actividades de la base de datos
    const activities = await Activity.findAll();

    // Responde con un estado 200 y las actividades
    return res.status(200).json(activities);
  } catch (error) {
    // Responde con un estado 500 y un mensaje de error si se produce un error
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllActivities;
