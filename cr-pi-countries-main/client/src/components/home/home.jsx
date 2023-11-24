import Page from "../page/page";
import styles from "../css-modules/home.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPage } from "../../redux/actions";
import Error from "../error/error";
import { useEffect, useState } from "react";

const Home = () => {
  const dispatch = useDispatch();

  const { sortedCountries } = useSelector((state) => state);
  const { errors } = useSelector((state) => state);
  const { stateError, error } = errors;

  const [localError, setLocalError] = useState({
    status: "",
    message: "",
    decription: "",
    reset: false,
  });

  const { pagination } = useSelector((state) => state);
  const { pageCountries, totalPages, pageSelect } = pagination;

  const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
      range.push(i);
      i += step;
    }
    return range;
  };

  const handlePage = (event) => {
    const { value } = event.target;
    dispatch(setPage(Number(value)));
  };

  const nextPage = () => {
    if (pageSelect < totalPages) {
      dispatch(setPage(pageSelect + 1));
    } else {
      dispatch(setPage(1)); // Si estás en la última página, vuelve a la primera
    }
  };

  const prevPage = () => {
    if (pageSelect > 1) {
      dispatch(setPage(pageSelect - 1));
    } else {
      dispatch(setPage(totalPages)); // Si estás en la primera página, ve a la última
    }
  };

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
