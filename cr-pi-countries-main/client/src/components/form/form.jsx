import { useEffect, useState } from "react";
import styles from "../css-modules/form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries, handleError } from "../../redux/actions";
import axios from "axios";
import Error from "../error/error";
import Alert from "../alert/alert";
import { BASE_API_URL, PORT } from "../../apiData";

const Form = () => {
  const { countries, errors } = useSelector((state) => state);
  const { stateError } = errors;
  const dispatch = useDispatch();

  const [countryMenu, setCountryMenu] = useState("");
  const [activity, setActivity] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
  });

  const [countriesSelect, setCountriesSelect] = useState([]);

  const [showAlert, setShowAlert] = useState(false);

  const mostrarAlertHandler = () => {
    setShowAlert(true);
  };

  const cerrarAlertHandler = () => {
    setShowAlert(false);
  };

  const clearForm = () => {
    setActivity({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
    });
    setCountriesSelect([]);
  };

  const validateCreate = (activity, countriesSelect) => {
    const inputErrors = {};
    if (
      activity.name === "" ||
      activity.name.trim().length < 3 ||
      activity.name.length > 255 ||
      !isNaN(activity.name)
    )
      inputErrors.name = true;

    if (activity.difficulty === "") inputErrors.difficulty = true;

    if (
      activity.duration === "" ||
      activity.duration < 1 ||
      activity.duration > 100
    )
      inputErrors.duration = true;

    if (activity.season === "") inputErrors.season = true;

    if (!countriesSelect[0]) inputErrors.countries = true;

    return inputErrors;
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setActivity({
      ...activity,
      [name]: value,
    });
  };

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

  const handleDelete = (event) => {
    const { value } = event.target;
    const [id] = value.split(",");
    event.preventDefault();
    setCountriesSelect((prevCountries) =>
      prevCountries.filter((element) => element[0] !== id)
    );
  };

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

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
            <h2 className={styles.title}>Create Activity</h2>
          </div>
          <form className={styles.form} onSubmit={handleCreate}>
            <div className={styles.itemList}>
              <label className={styles.label}>Name</label>
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
              <label className={styles.label}>Difficulty</label>
              <div className={styles.item}>
                <select
                  name="difficulty"
                  onChange={handleInput}
                  className={styles.input}
                  value={activity.difficulty}
                >
                  <option value="">--Select Difficulty--</option>
                  <option value="1">⭐ ☆ ☆ ☆ ☆</option>
                  <option value="2">⭐⭐ ☆ ☆ ☆</option>
                  <option value="3">⭐⭐⭐ ☆ ☆</option>
                  <option value="4">⭐⭐⭐⭐ ☆</option>
                  <option value="5">⭐⭐⭐⭐⭐</option>
                </select>
                {error.difficulty && <span className={styles.x}>❌</span>}
              </div>
              <label className={styles.label}>Duration</label>
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
              <label className={styles.label}>Season</label>
              <div className={styles.item}>
                <select
                  name="season"
                  onChange={handleInput}
                  className={styles.input}
                  value={activity.season}
                >
                  <option value="">--Select Season--</option>
                  <option value="Summer">Summer</option>
                  <option value="Autumn">Autumn</option>
                  <option value="Winter">Winter</option>
                  <option value="Spring">Spring</option>
                </select>
                {error.season && <span className={styles.x}>❌</span>}
              </div>
              <label className={styles.label}>Countries</label>
              <div className={styles.item}>
                <select
                  name="country"
                  onChange={handleSelect}
                  className={styles.input}
                  value={countryMenu}
                >
                  <option value="countries">--Select Countries--</option>
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
                  Create
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
