const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Country = sequelize.define(
    "Country",
    {
      id: {
        //cca3
        type: DataTypes.STRING(3),
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      name: {
        //name.common
        type: DataTypes.STRING,
        allowNull: false,
      },
      flag: {
        //flags.png
        type: DataTypes.TEXT,
        allowNull: false,
      },
      continent: {
        //region
        type: DataTypes.STRING,
        allowNull: false,
      },
      capital: {
        //capital []
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: ["ND"],
      },
      subregion: {
        //subregion
        type: DataTypes.STRING,
      },
      area: {
        type: DataTypes.STRING,
      },
      population: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  return Country;
};
