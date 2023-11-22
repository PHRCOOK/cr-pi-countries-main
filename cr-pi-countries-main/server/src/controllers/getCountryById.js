//se importa el modelo Contry y Activity desde la coneccion de secuelize en db
const {Country,Activity} = require("../db")

//retorna un objeto con el pais de id:xxx y sus actividades asosciadas
const getCountryById = async ( id )=>{
    const country = await Country.findByPk(id,
    {include: {
        model: Activity,
        attributes: ["name"],
        through: {
            attributes: []
        }
    }})
    
    return country
}

module.exports = getCountryById