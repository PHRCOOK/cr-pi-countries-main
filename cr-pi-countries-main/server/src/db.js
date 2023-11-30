require("dotenv").config({ path: "./api/.env" });
const { Sequelize } = require("sequelize");

const fs = require("fs");
const path = require("path");
// const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "postgres",
});

// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`,
//   {
//     logging: false,
//     native: false,
//   }
// );
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Activity, Country } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Activity.belongsToMany(Country, {
  through: "activity_country",
  timestamps: false,
});
Country.belongsToMany(Activity, {
  through: "activity_country",
  timestamps: false,
});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
