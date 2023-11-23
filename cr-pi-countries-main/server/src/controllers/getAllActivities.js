//se importa el modelo Country y Activity desde la coneccion de secuelize en db
const { Activity, Country } = require("../db");
//devuelve todas las actividades incluyendo los paises con los que estan vinculadas
const getAllActivities = async () => {
  return await Activity.findAll({
    include: {
      model: Country,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};
//se exporta el modulo para ser importado en el handler getActivities
module.exports = getAllActivities;
