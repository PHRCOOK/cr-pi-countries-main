//se importa el modelo Contry desde la coneccion de secuelize en db
const {Country} = require("../db") 
const {Op} = require("sequelize")

//devuelve un arreglo con los paises que en su nombre incluyan lo que llega por parametro en (name)
const getCountriesByName = async (name)=>{
    return await Country.findAll({
        where:{
            name: {[Op.iLike]:`%${name}%`}
        }
    })
}
//se exporta el controller para ser importado en el handler getCountries
module.exports = getCountriesByName