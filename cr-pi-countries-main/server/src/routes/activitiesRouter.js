const { Router } = require("express");
const postActivity = require("../handlers/postActivity");
const getActivities = require("../handlers/getActivities");
const deleteActivityHandler = require("../handlers/deleteActivities");

const activitiesRouter = Router();

//Se atienden las peticiones POST a la ruta /activities : se llama el handler postActivity
activitiesRouter.post("/", postActivity);

//Se atiemden las peticiones GET a la ruta /activities : se llama el handler getActivities
activitiesRouter.get("/", getActivities);

activitiesRouter.delete("/:id", deleteActivityHandler);

//se exportan las rutas de /activities
module.exports = activitiesRouter;
