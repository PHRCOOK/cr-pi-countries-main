const getCountryById = require("../controllers/getCountryById");
const setActivity = require("../controllers/setActivity");

const postActivity = async (req, res) => {
  try {
    const { activity, countries } = req.body;
    const { name, difficulty, season } = activity;

    //se verifica si en la data que llega por body.activity que esten todos los datos neesarios para crear la actividad
    //responde con un estatus 400 y envia un mensaje, si falta algun dato de la actividad
    if (!name || !difficulty || !season)
      return res.status(400).json({ error: "Faltan datos" });

    //responde con un estatus 400 y envia un mensaje si no llega por lo menos un pais dentro del arreglo body.countries
    if (countries.length < 1)
      return res.status(400).json({ error: "Se necesita un pais" });

    //verifica si los elementos que llegan dentro de countries son codigos de paises validos y exixtentes en la BD
    const countriFail = [];
    for (let country of countries) {
      const regex = /^[A-Z]{3}$/;
      const countryValid = await (regex.test(country.toUpperCase()) &&
        getCountryById(country.toUpperCase()));
      if (!countryValid) countriFail.push(country);
    }

    //responde con un estatus 400 y un mensaje si alguno de los codigos no es valido
    if (countriFail.length > 0)
      return res
        .status(400)
        .json({
          error: `Los siguiemtes codigos de pais no son validos [${countriFail.join(
            " "
          )}]`,
        });

    //devuelve un arreglo de id de paises que sean todos en mayuscula
    const countriesUp = countries.map((country) => country.toUpperCase());

    //llama al controller setActivity con todos los datos para crear la actividad y los paises para relacionar
    const newAactivity = await setActivity(activity, countriesUp);

    //responde con un estatus 201 y la actividad creada
    return res.status(201).json(newAactivity);
  } catch (error) {
    //responde con un estatus 500 y un mensaje de error si se produce un fallo en la creacion de la actividad
    res.status(500).json({ error: error.message });
  }
};
//se exporta el handler para ser importado en el router activitiesRouter
module.exports = postActivity;
