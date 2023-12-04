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
  deleteActivity,
} from "../../redux/actions";
import {
  getCountries,
  filterByActivities,
  filterByContinent,
  resetFilter,
} from "../../redux/actions";
import { memo, useEffect, useState } from "react";
import axios from "axios";

//renderiza la navbar y la sidebar, hace los dispatch para la busqueda el filtrado y el ordenamiento
const Nav = () => {
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activitiesDelete = useSelector((state) => state.activities);

  //hace un fetch para obtener las actividades y las guarda en el estado global

  //estado local para el control de los menues desplegables de continents y activities
  const [valorSelect, setValorSelect] = useState({
    selectContinent: "",
    selectActivity: "",
  });

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await axios.get(`/activities`);
      dispatch(getActivities(response.data));
    };

    fetchActivities();
  }, [dispatch]);

  //elimina una actividad y actualiza el estado global de activities
  const handleDelete = async (id) => {
    await axios.delete(`/activities/${id}`);
    dispatch(deleteActivity(id));
    // Restablecer los campos de filtro por actividad y el selector de handleDelete
    setValorSelect({
      ...valorSelect,
      selectActivity: "",
    });
    window.location.reload();
  };

  //estados locales para el control de los inputs
  const [valueInput, setValueInput] = useState("");
  const [criterio, setCriterio] = useState({});
  const [cheked, setCheked] = useState(true);

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
    navigate("/");
  };

  const handleGoToActivities = () => {
    dispatch(resetError());
    navigate("/activities");
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
    navigate("/home");
  };

  // Funciones para manejar el ordenamiento, filtrado, búsqueda y navegación
  // Cada función realiza un despacho para actualizar el estado de Redux
  // Las funciones de manejo de eventos se definen aquí...

  useEffect(() => {
    if (!errors.stateError) {
      dispatch(getContinents());
      dispatch(getActivities());
      dispatch(setPage(1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries, criterio, errors]);

  return location !== "/" ? (
    // Renderiza la barra de navegación y la barra lateral
    // El contenido se renderiza en función de la ubicación y el estado de error
    // El código de renderización se define aquí...
    <>
      <header className={styles.headerContainer}>
        <h1>PAISES DEL MUNDO</h1>
        <nav className={styles.navBar}>
          {location !== "/home" && (
            <span onClick={handleGoToHome} className={styles.goToHome}>
              Inicio
            </span>
          )}
          {location === "/home" && !errors.stateError ? (
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
                SALIR
              </span>
            </>
          ) : null}
        </nav>
      </header>
      {location === "/home" && !errors.stateError ? (
        <div className={styles.menuContainer}>
          <div>
            <button className={styles.menuOrder1} onClick={handleOrderAlfAsc}>
              Alfabetico Ascendente
            </button>
            <button className={styles.menuOrder1} onClick={handleOrderAlfDesc}>
              Alfabetico Descendente
            </button>
          </div>
          <div>
            <button className={styles.menuOrder1} onClick={handleOrderPopAsc}>
              Poblacion Ascendente
            </button>
            <button className={styles.menuOrder1} onClick={handleOrderPopDesc}>
              Poblacion Descendente
            </button>
          </div>

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
          <aside className={styles.delete}>
            <div className={styles.divDeleteButton}>
              <button
                className={styles.deleteButton}
                onClick={() =>
                  handleDelete(document.querySelector("#activitySelect").value)
                }
              >
                Eliminar Actividad
              </button>
            </div>
            <div>
              <select
                multiple
                className={styles.divDeleteSelector}
                id="activitySelect"
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
