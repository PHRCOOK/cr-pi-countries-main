//se importa el modelo Contry y Activity desde la coneccion de secuelize en db
const {Country,Activity} = require("../db")

const getAllCountries = async () => {
    //devuelve un arreglo con todos los paises de la base de datos y sus actividades asosciadas
    const allCountries = await Country.findAll({
        include: {
            model: Activity,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
    //levanta una exepcion si no se devuelve ningun pais
    if(allCountries.length === 0) throw new Error ("Error en la obtención de registros")
    
    return allCountries

}
//se exporta el controller para ser importado en el handler getCountries
module.exports = getAllCountries