const getCountryById = require("../controllers/getCountryById");

const getCountry = async (req, res) => {
  try {
    const { idPais } = req.params;

    //se verifica si no llega un idPais por params y se responde con un
    //estatus 400 y un mensaje de error
    if (!idPais) return res.status(400).json({ error: "Es necesario un Id" });

    //se verifica si lo que llega por params tiene el formato ISO Alpha 3 country code (CCA3)
    const id = idPais.toUpperCase(); // se normaliza a mayusculas
    const regex = /^[A-Z]{3}$/; //se verifica si son 3 caracteres alfabeticos de la A la Z

    //si no cumple con el formato CCA3 responde con un estatus 400 y un json com un mensaje
    if (!regex.test(id))
      return res
        .status(400)
        .json({
          error: `Id: <${id}> invalido!, se necesita un ISO Alpha 3 country code (cca3)`,
        });

    //se busca un pais con el id que llega por params mediante el controller getCountryById
    const country = await getCountryById(id);

    // se responde con un estatus 400 y un json con un mensaje, si no se encontro ningun pais con el id:xxx y s
    if (!country)
      return res
        .status(404)
        .json({ error: `No se encuentra un pais con el Id: ${id}` });

    //se responde con un estaus 200 y el pais correspondiente al id:XXX
    return res.status(200).json(country);
  } catch (error) {
    //En cualquier otro caso de error responde con un estaus 500 y un mensaje de error
    res.status(500).json({ error: error.message });
  }
};

module.exports = getCountry;
