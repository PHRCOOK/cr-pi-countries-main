const getAllCountries = require("../controllers/getAllCountries")
const getCountriesByName = require("../controllers/getCountriesByName")

const getCountries = async (req,res)=>{
    try{
        const {name} = req.query
        //verifica si por query llega la propiedad name
        if(name){
            //busca un pais por el nombre (coincidencia parcial)
            const filterNameCountries = await getCountriesByName(name)

            //si no se encuentran coincidencias responde con un estado 404 y un json con el mensaje de error
            if(filterNameCountries.length === 0) return res.status(404)
                .json({error:`No se encontro un pais que se ajuste al criterio de busqueda: '${name}'`})
            
            //responde con un estatus 200 y un json con el resultado de la busqueda
            return res.status(200).json(filterNameCountries)
        } 
        
        //Cuando no llega la propiedad name por query, responde con un estatus 200 
        //y un json con todos los paises almacenados en la base de datos
        const allCountries = await getAllCountries()
        res.status(200).json(allCountries)
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}
//se exporta el handler getCountries para ser importado en el router countriRouter
module.exports = getCountries