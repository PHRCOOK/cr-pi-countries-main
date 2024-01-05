const axios = require("axios");

//se importa el modelo Contry desde la coneccion de secuelize en db
const { Country } = require("../db");

//se realiza una peticion a la api y puebla la base de datos con la data recibida
//informa la evolucion del proceso por consola
const populateDb = async () => {
  try {
    console.log("Reading API...");
    //realiza la peticion a la API
    const { data } = await axios(`http://localhost:5000/countries`);
    // const { data } = await axios(`${BASE_API_URL}/countries`); BASE DE DATOS REMOTA
    //prepara un arreglo con todos los datos obtenidos de la api
    console.log("Preparing data package...");
    const bulckData = data?.map((country) => {
      return {
        id: country.cca3,
        name: country.name.common,
        flag: country.flags.png,
        continent: country.region,
        capital: country.capital,
        subregion: country.subregion,
        area: country.area + " km2",
        population: country.population,
      };
    });
    //Inserta los datos obtenidos desde la api de forma masiba en la DB
    console.log("Populating Database...");
    await Country.bulkCreate(bulckData, { ignoreDuplicates: true });

    //informa por consola que el proceso se completo correctamante
    console.log("Database Updated!");
  } catch (error) {
    //si falla el proceso de poblado de la base de datos lo informa por consola
    console.log(error.message);
    console.log("Error populating Database!!");
  }
};

//se exporta el modulo para ser importado en index cuando al levanta el server se sincroniza la conexion con sequelize mediante el alias conn.
module.exports = populateDb;
