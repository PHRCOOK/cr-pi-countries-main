require("dotenv").config({ path: "./api/.env" });
const axios = require("axios");
const server = require("./src/server");
const { conn } = require("./src/db.js");

const populateDb = require("./src/controllers/populateDb.js");

conn.sync({ alter: true, force: false }).then(() => {
  //con {force: true} se dropean todas las tablas al levantar el server
  server.listen(process.env.PORT, async () => {
    //Cuando se levanta el servidor se ejecuta populateDB para poblar la base de datos
    await populateDb();
    console.log("Servidor levantado en el puerto:", process.env.PORT);
  });
});
