const { Router } = require("express");
const getCountries = require("../handlers/getCountries");
const getCountry = require("../handlers/getCountry");

const countriesRouter = Router();

//Se atienden las peticiones GET a la ruta "/countries" : llama el handler getCountries
countriesRouter.get("/", getCountries);

//se atienden las peticiones GET a la ruta "/countries" con el parametro "idPais" : llama el handler getCountry
countriesRouter.get("/:idPais", getCountry);

//Se exportan las rutas de /countries
module.exports = countriesRouter;
