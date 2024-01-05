import styles from "../css-modules/nav.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getActivities,
  getAllCountries,
  getContinents,
  orderCountryAlf,
  orderCountryPop,
  resetError,
  setPage,
  getCountries,
  filterByActivities,
  filterByContinent,
  resetFilter,
} from "../../redux/actions";
import { deleteActivityThunk } from "../../redux/thunks";
import { memo, useEffect } from "react";
import { useState } from "react";
import PATHROUTES from "../helpers/Pathroutes";

//renderiza la navbar y la sidebar, hace los dispatch para la busqueda el filtrado y el ordenamiento
const Nav = () => {
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activitiesDelete = useSelector((state) => state.activities);

  //estado local para el control de los menues desplegables de continents y activities
  const [valorSelect, setValorSelect] = useState({
    selectContinent: "",
    selectActivity: "",
  });

  // Inicialmente, 'selectedActivity' se establece en una cadena vacía
  const [selectedActivity, setSelectedActivity] = useState("");

  // Esta función se encarga de eliminar la actividad seleccionada y recargar la actividad no eliminada
  const handleDelete = async () => {
    await dispatch(deleteActivityThunk(selectedActivity));
    dispatch(getActivities());
  };

  // Esta función se ejecuta cuando cambia el valor de un elemento select
  // Actualiza la variable de estado 'selectedActivity' con el nuevo valor
  const handleSelectChange = (event) => {
    setSelectedActivity(event.target.value);
  };

  //estados locales para el control de los inputs
  const [valueInput, setValueInput] = useState("");
  const [criterio] = useState({});
  const { continents } = useSelector((state) => state);
  const { activities } = useSelector((state) => state);
  const { countries } = useSelector((state) => state);
  const { errors } = useSelector((state) => state);

  //arreglo de actividades sin elementos repetidos para mostrar en el menú desplegable de activities
  const activitiesMenu = [
    ...new Set([...activities.map((activity) => activity.name)]),
  ];

  //hace un dispath para aplicar el orden alfabetico ascendente
  const handleOrderAlfAsc = () => {
    dispatch(orderCountryAlf("ASC"));
  };

  //hace un dispath para aplicar el orden alfabetico descendente
  const handleOrderAlfDesc = () => {
    dispatch(orderCountryAlf("DES"));
  };

  //hace un dispath para aplicar el orden por poblacion ascendente
  const handleOrderPopAsc = () => {
    dispatch(orderCountryPop("ASC"));
  };

  //hace un dispath para aplicar el orden por poblacion descendente
  const handleOrderPopDesc = () => {
    dispatch(orderCountryPop("DES"));
  };

  //hace un dispath para reestablecer los filtros y aplicar el filtrado por continentes
  const handleFilterContinent = (event) => {
    dispatch(resetFilter());
    const { value } = event.target;
    setValorSelect({
      ...valorSelect,
      selectContinent: value,
      selectActivity: "",
    });
    dispatch(filterByContinent(value));
  };

  //hace un dispath para reestablecer los filtros y aplicar el filtrado por actividades
  const handleFilterActivities = (event) => {
    dispatch(resetFilter());
    const { value } = event.target;
    setValorSelect({
      ...valorSelect,
      selectContinent: "",
      selectActivity: value,
    });
    dispatch(filterByActivities(value));
  };

  //reestablece el estado de los menues y hace un dispatch para reestablecer los filtros y actualizar el estado global de countries y activities
  const handleresetFilter = () => {
    setValorSelect({
      selectContinent: "",
      selectActivity: "",
      selecOrderDesc: false,
    });
    dispatch(resetFilter());
    dispatch(getAllCountries());
    dispatch(getActivities());
  };

  const handleInputSerch = (event) => {
    const { value } = event.target;
    setValueInput(value);
  };

  const handleSerch = () => {
    dispatch(getCountries(valueInput));
    setValueInput("");
  };

  const handleGoToLanding = () => {
    dispatch(resetError());
    navigate(PATHROUTES.ROOT);
  };

  const handleGoToActivities = () => {
    dispatch(resetError());
    navigate(PATHROUTES.FORM);
  };

  const handleGoToHome = () => {
    dispatch(getAllCountries());
    dispatch(getActivities());
    dispatch(getContinents());
    dispatch(setPage(1));
    dispatch(resetError());
    setValorSelect({
      selectContinent: "",
      selectActivity: "",
      selecOrderDesc: false,
    });
    navigate(PATHROUTES.HOME);
  };

  // Funciones para manejar el ordenamiento, filtrado, búsqueda y navegación
  // Cada función realiza un despacho para actualizar el estado de Redux

  useEffect(() => {
    if (!errors.stateError) {
      dispatch(getContinents());
      dispatch(getActivities());
      dispatch(setPage(1));
    }
  }, [countries, criterio, errors]);

  return location !== PATHROUTES.ROOT ? (
    // Renderiza la barra de navegación y la barra lateral
    // El contenido se renderiza en función de la ubicación y el estado de error

    <>
      <header className={styles.headerContainer}>
        <h1>PAISES DEL MUNDO</h1>
        <nav className={styles.navBar}>
          {location !== PATHROUTES.HOME && (
            <span onClick={handleGoToHome} className={styles.goToHome}>
              Inicio
            </span>
          )}
          {location === PATHROUTES.HOME && !errors.stateError ? (
            <>
              <span
                onClick={handleGoToActivities}
                className={styles.goToActivities}
              >
                Actividades
              </span>
              <input
                type="text"
                onChange={handleInputSerch}
                placeholder="Buscar pais por nombre"
                value={valueInput}
              />
              <button onClick={handleSerch} className={styles.findCountry}>
                Buscar
              </button>
              <span onClick={handleGoToLanding} className={styles.goToLanding}>
                Salir
              </span>
            </>
          ) : null}
        </nav>
      </header>
      {location === PATHROUTES.HOME && !errors.stateError ? (
        <div className={styles.menuContainer}>
          <div>
            <button className={styles.menuOrder1} onClick={handleOrderAlfAsc}>
              Alfabetico Ascendente
            </button>
            <button className={styles.menuOrder1} onClick={handleOrderAlfDesc}>
              Alfabetico Descendente
            </button>
            <aside className={styles.menuFilter}>
              <div className={styles.menuTitle}>
                <h2>Filtros</h2>
              </div>
              <select
                name="selectContinent"
                title="Filter by Continent"
                onChange={handleFilterContinent}
                value={valorSelect.selectContinent}
              >
                <option value="" disabled>
                  Filtro por continente
                </option>
                {continents?.map((continent, index) => (
                  <option key={index} value={continent}>
                    {continent}
                  </option>
                ))}
              </select>
              <select
                name="selectActivity"
                title="Filter by Activities"
                onChange={handleFilterActivities}
                value={valorSelect.selectActivity}
              >
                <option value="" disabled>
                  Filtro de actividades
                </option>
                {activitiesMenu?.map((activity, index) => (
                  <option key={index} value={activity}>
                    {activity}
                  </option>
                ))}
              </select>
              <button onClick={handleresetFilter}>Limpiar filtros</button>
            </aside>
          </div>
          <div>
            <button className={styles.menuOrder1} onClick={handleOrderPopDesc}>
              Poblacion Descendente
            </button>
            <button className={styles.menuOrder1} onClick={handleOrderPopAsc}>
              Poblacion Ascendente
            </button>
          </div>

          <aside className={styles.delete}>
            <div className={styles.divDeleteButton}>
              <button className={styles.deleteButton} onClick={handleDelete}>
                Eliminar Actividad
              </button>
            </div>
            <div>
              <select
                className={styles.divDeleteSelector}
                id="activitySelect"
                value={selectedActivity}
                onChange={handleSelectChange}
              >
                <option value="">Elija Actividad a Eliminar</option>
                {activitiesDelete.map((activity) => (
                  <option key={activity.id} value={activity.id}>
                    {activity.name}
                  </option>
                ))}
              </select>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  ) : null;
};

export default memo(Nav);
