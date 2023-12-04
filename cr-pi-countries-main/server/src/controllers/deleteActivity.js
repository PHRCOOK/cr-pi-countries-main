// Importamos el modelo Activity de la base de datos
const { Activity } = require("../db");

// Definimos una función asíncrona para eliminar una actividad
const deleteActivity = async (id) => {
  try {
    // Usamos el método destroy de Sequelize para eliminar la actividad
    await Activity.destroy({
      where: {
        id: id, // Buscamos la actividad donde el id sea igual al proporcionado
      },
    });
  } catch (error) {
    // Si hay un error, lo registramos en la consola
    console.error(error);
  }
};

// Exportamos la función deleteActivity
module.exports = { deleteActivity };
