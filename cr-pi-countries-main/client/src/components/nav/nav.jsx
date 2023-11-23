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
} from "../../redux/actions";
import {
  getCountries,
  filterByActivities,
  filterByContinent,
  resetFilter,
} from "../../redux/actions";
import { memo, useEffect, useState } from "react";

//renderiza la navbar y la sidebar, hace los dispatch para la busqueda el filtrado y el ordenamiento
const Nav = () => {
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //estado local para el control de los menues desplegables de continents y activities
  const [valorSelect, setValorSelect] = useState({
    selectContinent: "",
    selectActivity: "",
  });

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

  //hace un dispath para aplicar el orden alfabetico ASC/DESC segun criterio
  const handleOrderALf = () => {
    dispatch(orderCountryAlf(criterio.criterio));
  };

  //hace un dispath para aplicar el orden por poblacion ASC/DESC segun criterio
  const handleOrderPop = () => {
    dispatch(orderCountryPop(criterio.criterio));
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

  const handleselectCriterio = (event) => {
    const { name, value } = event.target;
    value === "ASC" ? setCheked(true) : setCheked(false);
    setCriterio({
      [name]: value,
    });
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

  useEffect(() => {
    if (!errors.stateError) {
      dispatch(getContinents());
      dispatch(getActivities());
      dispatch(setPage(1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries, criterio, errors]);

  return location !== "/" ? (
    <>
      <header className={styles.headerContainer}>
        <h1>World Countries</h1>
        <nav className={styles.navBar}>
          <span onClick={handleGoToHome} className={styles.goToHome}>
            Home
          </span>
          {location === "/home" && !errors.stateError ? (
            <>
              <span
                onClick={handleGoToActivities}
                className={styles.goToActivities}
              >
                Activities
              </span>
              <input
                type="text"
                onChange={handleInputSerch}
                placeholder="País ?"
                value={valueInput}
              />
              <button onClick={handleSerch} className={styles.findCountry}>
                Search
              </button>
            </>
          ) : null}
        </nav>
      </header>
      {location === "/home" && !errors.stateError ? (
        <div className={styles.menuContainer}>
          <aside className={styles.menuOrder}>
            <div className={styles.menuTitle}>
              <h2>Order</h2>
            </div>
            <div>
              <button onClick={handleOrderALf}>Alphabetical</button>
            </div>
            <div>
              <button onClick={handleOrderPop}>Population</button>
            </div>
            <div className={styles.criterioConainer}>
              <div>
                <label htmlFor={"Ascendente"}>Ascending</label>
                <input
                  checked={cheked}
                  type="radio"
                  name="criterio"
                  id="Ascendente"
                  onChange={handleselectCriterio}
                  value="ASC"
                />
              </div>
              <div>
                <label htmlFor={"Descendente"}>Descending</label>
                <input
                  type="radio"
                  name="criterio"
                  id="Descendente"
                  onChange={handleselectCriterio}
                  value="DES"
                />
              </div>
            </div>
          </aside>

          <aside className={styles.menuFilter}>
            <div className={styles.menuTitle}>
              <h2>Filter</h2>
            </div>
            <select
              name="selectContinent"
              title="Filter by Continent"
              onChange={handleFilterContinent}
              value={valorSelect.selectContinent}
            >
              <option value="" disabled>
                Filter by Continent
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
                Filter by Activities
              </option>
              {activitiesMenu?.map((activity, index) => (
                <option key={index} value={activity}>
                  {activity}
                </option>
              ))}
            </select>
            <button onClick={handleresetFilter}>Clear Filters</button>
          </aside>
        </div>
      ) : null}
    </>
  ) : null;
};

export default memo(Nav);
