// Importamos la función deleteActivity del controlador
const { deleteActivity } = require("../controllers/deleteActivity");

// Definimos una función asíncrona para manejar la petición de eliminar una actividad
const deleteActivityHandler = async (req, res, next) => {
  // Extraemos el id de los parámetros de la petición
  const { id } = req.params;
  try {
    // Llamamos a la función deleteActivity con el id
    await deleteActivity(id);
    // Enviamos un mensaje de éxito al cliente
    res.status(200).send("Actividad eliminada exitosamente");
  } catch (error) {
    // Si hay un error, lo pasamos al siguiente middleware para su manejo
    next(error);
  }
};

// Exportamos la función deleteActivityHandler
module.exports = deleteActivityHandler;
