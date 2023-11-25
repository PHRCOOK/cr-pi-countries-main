import Page from "../page/page";
import styles from "../css-modules/home.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPage } from "../../redux/actions";
import Error from "../error/error";
import { useEffect, useState } from "react";

const Home = () => {
  const dispatch = useDispatch();

  // Obteniendo los países ordenados del estado de Redux
  const { sortedCountries } = useSelector((state) => state);
  // Obteniendo los errores del estado de Redux
  const { errors } = useSelector((state) => state);
  const { stateError, error } = errors;

  // Estado local para manejar errores

  const [localError, setLocalError] = useState({
    status: "",
    message: "",
    decription: "",
    reset: false,
  });

  // Obteniendo la paginación del estado de Redux

  const { pagination } = useSelector((state) => state);
  const { pageCountries, totalPages, pageSelect } = pagination;

  // Función para generar un rango de números
  // Se utiliza para generar las páginas disponibles para la paginación

  const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
      range.push(i);
      i += step;
    }
    return range;
  };

  // Manejador de eventos para cambiar la página
  // Se dispara cuando el usuario selecciona una página diferente en la paginación

  const handlePage = (event) => {
    const { value } = event.target;
    dispatch(setPage(Number(value)));
  };

  // Función para ir a la siguiente página
  // Se dispara cuando el usuario hace clic en el botón "Siguiente"

  const nextPage = () => {
    if (pageSelect < totalPages) {
      dispatch(setPage(pageSelect + 1));
    } else {
      dispatch(setPage(1)); // Si estás en la última página, vuelve a la primera
    }
  };

  // Función para ir a la página anterior
  // Se dispara cuando el usuario hace clic en el botón "Anterior"

  const prevPage = () => {
    if (pageSelect > 1) {
      dispatch(setPage(pageSelect - 1));
    } else {
      dispatch(setPage(totalPages)); // Si estás en la primera página, ve a la última
    }
  };

  // Efecto para manejar los errores
  // Se ejecuta cuando hay un cambio en el estado de error

  useEffect(() => {
    stateError && error.response
      ? setLocalError({
          status: error.response.request.status,
          message: error.response.statusText,
          decription: error.response.data.error,
          reset: true,
        })
      : setLocalError({
          status: "500",
          message: error?.message,
          decription: "Failed to load resource",
        });
    !stateError &&
      setLocalError({
        status: "",
        message: "",
        decription: "",
        reset: false,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  return (
    <>
      {stateError ? (
        <Error
          status={localError?.status}
          message={localError?.message}
          description={localError?.decription}
          reset={localError?.reset}
        />
      ) : (
        <section className={styles.principalContainer}>
          {sortedCountries && <Page countriesSelect={pageCountries} />}
          {totalPages ? (
            <div className={styles.pageSelector}>
              <button className={styles.btnPage1} onClick={prevPage}>
                Anterior
              </button>
              {range(1, totalPages).map((elem, index) => (
                <button
                  className={styles.btnPage}
                  style={
                    pageSelect - 1 === index
                      ? {
                          backgroundColor: "#333b",
                          border: "#333 solid 3px",
                          borderRadius: "3px",
                        }
                      : {}
                  }
                  key={index}
                  onClick={handlePage}
                  value={elem}
                >
                  {elem}
                </button>
              ))}
              <button className={styles.btnPage2} onClick={nextPage}>
                Siguiente
              </button>
            </div>
          ) : null}
        </section>
      )}
    </>
  );
};

export default Home;
