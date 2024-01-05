const { Router } = require("express");
const postActivity = require("../handlers/postActivity");
const getActivities = require("../handlers/getActivities");
const deleteActivityHandler = require("../handlers/deleteHandlerActivity");

const activitiesRouter = Router();

//Se atienden las peticiones POST a la ruta /activities : se llama el handler postActivity
activitiesRouter.post("/", postActivity);

//Se atienden las peticiones GET a la ruta /activities : se llama el handler getActivities
activitiesRouter.get("/", getActivities);

//Se atienden las peticiones DELETE a la ruta /activities/:id : se llama el handler deleteActivityHandler

activitiesRouter.delete("/:id", deleteActivityHandler);

//se exportan las rutas de /activities
module.exports = activitiesRouter;
