const { Router } = require("express");
const countriesRouter = require("./countriesRouter");
const activitiesRouter = require("./activitiesRouter");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers

//Se definen las rutas con su correspondiente router
router.use("/countries", countriesRouter);
router.use("/activities", activitiesRouter);

//Se exporta el enrutador con las rutas definidas
module.exports = router;
