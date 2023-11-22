const {Activity} = require("../db")

//se crea la actividad con los datos recividos por parametro, se puede omitir la duracion 
const setActivity = async ({name,difficulty,duration,season},countries) =>{
    const [activity] = await Activity.findOrCreate({
        where: {
            name:name,
            difficulty:Number(difficulty),
            duration: Number(duration) || null,
            season,
            }
        })

    //se establecen las relaciones con los paises llegados en el arreglo countries
    countries.map( async country=> await activity.addCountry(country))

    //se retorna la actividad creada ya con los paises vinculados
    return activity
}

module.exports = setActivity