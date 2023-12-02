import { useEffect, useState } from "react";
import styles from "../css-modules/form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries, handleError } from "../../redux/actions";
import axios from "axios";
import Error from "../error/error";
import Alert from "../alert/alert";
import { BASE_API_URL, PORT } from "../../apiData";

const Form = () => {
  // Usamos los hooks de Redux para obtener el estado y despachar acciones
  const { countries, errors } = useSelector((state) => state);
  const { stateError } = errors;
  const dispatch = useDispatch();

  // Definimos el estado local del componente
  const [countryMenu, setCountryMenu] = useState("");
  const [activity, setActivity] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
  });
  // Definimos las funciones para manejar los eventos del formulario
  const [countriesSelect, setCountriesSelect] = useState([]);

  const [showAlert, setShowAlert] = useState(false);

  const mostrarAlertHandler = () => {
    setShowAlert(true);
  };

  const cerrarAlertHandler = () => {
    setShowAlert(false);
  };

  // Esta función se utiliza para limpiar el formulario, restableciendo todos los campos a sus valores iniciales
  const clearForm = () => {
    setActivity({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
    });
    setCountriesSelect([]);
  };

  // Esta función se utiliza para validar los datos del formulario antes de enviarlos
  // Comprueba si cada campo cumple con ciertas condiciones y, si no, agrega una propiedad al objeto inputErrors con un valor de true
  const validateCreate = (activity, countriesSelect) => {
    const inputErrors = {};

    // Comprueba si el nombre de la actividad está vacío, tiene menos de 3 caracteres, más de 255 caracteres o es un número
    if (
      activity.name === "" ||
      activity.name.trim().length < 3 ||
      activity.name.length > 255 ||
      !isNaN(activity.name)
    )
      inputErrors.name = true;

    // Comprueba si la dificultad de la actividad está vacía
    if (activity.difficulty === "") inputErrors.difficulty = true;

    // Comprueba si la duración de la actividad está vacía, es menor que 1 o mayor que 100
    if (
      activity.duration === "" ||
      activity.duration < 1 ||
      activity.duration > 100
    )
      inputErrors.duration = true;

    if (activity.season === "") inputErrors.season = true;

    if (!countriesSelect[0]) inputErrors.countries = true;

    // Retorna el objeto inputErrors, que puede ser utilizado para mostrar mensajes de error en el formulario
    return inputErrors;
  };

  // Esta función maneja el cambio en los campos de entrada del formulario
  // Actualiza el estado de la actividad con los nuevos valores de los campos de entrada
  const handleInput = (event) => {
    const { name, value } = event.target;
    setActivity({
      ...activity,
      [name]: value,
    });
  };

  // Esta función maneja el cambio en el campo de selección del formulario
  // Actualiza el estado del menú del país y de los países seleccionados con los nuevos valores
  const handleSelect = (event) => {
    const { value } = event.target;
    const [id, image, name] = value.split(",");
    setCountryMenu(id);
    if (value !== "countries") {
      if (
        countriesSelect.filter((element) => element[0] === value.split(",")[0])
          .length === 0
      ) {
        setCountriesSelect([...countriesSelect, [id, image, name]]);
      }
    }
  };

  // Esta función maneja la creación de una nueva actividad
  // Envía una petición POST a la API con los datos de la nueva actividad y los países seleccionados
  const handleCreate = async (event) => {
    event.preventDefault();
    console.log(activity, countriesSelect);
    try {
      const endpoint = `${BASE_API_URL}:${PORT}/activities`;
      await axios.post(endpoint, {
        activity: activity,
        countries: countriesSelect.map((element) => element[0]),
      });
      mostrarAlertHandler();
      clearForm();
    } catch (error) {
      return dispatch(handleError(error));
    }
  };
  //BASE DE DATOS REMOTA
  // const handleCreate = async (event) => {
  //   event.preventDefault();
  //   console.log(activity, countriesSelect);
  //   try {
  //     const endpoint = `${BASE_API_URL}/activities`;
  //     await axios.post(endpoint, {
  //       activity: activity,
  //       countries: countriesSelect.map((element) => element[0]),
  //     });
  //     mostrarAlertHandler();
  //     clearForm();
  //   } catch (error) {
  //     return dispatch(handleError(error));
  //   }
  // };

  // Esta función maneja la eliminación de un país seleccionado
  // Actualiza el estado de los países seleccionados eliminando el país seleccionado
  const handleDelete = (event) => {
    const { value } = event.target;
    const [id] = value.split(",");
    event.preventDefault();
    setCountriesSelect((prevCountries) =>
      prevCountries.filter((element) => element[0] !== id)
    );
  };

  // Usamos useEffect para obtener todos los países cuando se monta el componente
  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  // Validamos los datos del formulario antes de enviarlo
  const error = validateCreate(activity, countriesSelect);

  return (
    <div className={styles.principalContainer}>
      {stateError ? (
        <Error
          status={errors.error.response ? errors.error.response.status : "500"}
          message={errors.error.message}
          description={
            errors.error.response
              ? error.response.data.error
              : "Can’t connect to server"
          }
        />
      ) : (
        <div className={styles.container}>
          {showAlert && <Alert onClose={cerrarAlertHandler} />}
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>Crear Actividad Turistica</h2>
          </div>
          <form className={styles.form} onSubmit={handleCreate}>
            <div className={styles.itemList}>
              <label className={styles.label}>Nombre</label>
              <div className={styles.item}>
                <input
                  className={styles.name}
                  title={"Min 3 - Max 255 caracteres"}
                  type="text"
                  name="name"
                  placeholder="Ingrese una actividad"
                  onChange={handleInput}
                  autoComplete="off"
                  value={activity.name}
                />
                {error.name && <span className={styles.x}>❌</span>}
              </div>
              <label className={styles.label}>Dificultad</label>
              <div className={styles.item}>
                <select
                  name="difficulty"
                  onChange={handleInput}
                  className={styles.input}
                  value={activity.difficulty}
                >
                  <option value="">--Selecione dificultad--</option>
                  <option value="1">⭐ ☆ ☆ ☆ ☆</option>
                  <option value="2">⭐⭐ ☆ ☆ ☆</option>
                  <option value="3">⭐⭐⭐ ☆ ☆</option>
                  <option value="4">⭐⭐⭐⭐ ☆</option>
                  <option value="5">⭐⭐⭐⭐⭐</option>
                </select>
                {error.difficulty && <span className={styles.x}>❌</span>}
              </div>
              <label className={styles.label}>Duracion</label>
              <div className={styles.item}>
                <input
                  type="number"
                  name="duration"
                  title="Un numero entre 1-100"
                  placeholder="Ingrese la duracion en hs."
                  onChange={handleInput}
                  className={styles.duration}
                  min="1"
                  max="100"
                  value={activity.duration}
                />
                {error.duration && <span className={styles.x}>❌</span>}
              </div>
              <label className={styles.label}>Estacion</label>
              <div className={styles.item}>
                <select
                  name="season"
                  onChange={handleInput}
                  className={styles.input}
                  value={activity.season}
                >
                  <option value="">--Seleccione estacion-</option>
                  <option value="Summer">Verano</option>
                  <option value="Autumn">Otoño</option>
                  <option value="Winter">Invierno</option>
                  <option value="Spring">Primavera</option>
                </select>
                {error.season && <span className={styles.x}>❌</span>}
              </div>
              <label className={styles.label}>Paises</label>
              <div className={styles.item}>
                <select
                  name="country"
                  onChange={handleSelect}
                  className={styles.input}
                  value={countryMenu}
                >
                  <option value="countries">--Seleccione paises--</option>
                  {countries?.map((country, index) => (
                    <option
                      key={index}
                      value={[country.id, country.flag, country.name]}
                    >
                      {country.name}
                    </option>
                  ))}
                </select>
                {error.countries && <span className={styles.x}>❌</span>}
              </div>
            </div>
            <div>
              {countriesSelect?.map((element, index) => (
                <span
                  key={index}
                  className={styles.span}
                  title={element[2]}
                  style={{
                    backgroundImage: `url(${element[1]})`,
                    backgroundSize: "62px 28px",
                    backgroundPosition: "left center",
                    backgroundRepeat: "no-repeat",
                  }}
                  value={element}
                >
                  {element[0]}
                  <button
                    onClick={handleDelete}
                    className={styles.btnDelete}
                    value={element}
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
            <div>
              <button
                type="submit"
                className={styles.btn}
                disabled={Object.entries(error).length > 0}
              >
                <span
                  className={styles.front}
                  hidden={Object.entries(error).length > 0}
                >
                  Crear actividad
                </span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Form;
