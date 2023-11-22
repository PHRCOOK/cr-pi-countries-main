const getAllActivities = require("../controllers/getAllActivities")


//recive una peticion GET desde el router activitiesRouter
const getActivities = async (req,res)=>{
  try{
    //responde con un estatus 200 y un json con todas la actividades almacenadas en la base de datos
      const activities = await getAllActivities()
      res.status(200).json(activities)
  }
  catch(error){
    //en caso de algun error responde con un estatus 500 y un json con el mensaje de error
    res.status(500).json({error:error.message})
  }
}
//Se exporta el modulo para ser importado en activitiesRouter
module.exports = getActivities