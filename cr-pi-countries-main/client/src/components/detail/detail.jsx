import styles from "../css-modules/detail.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Error from "../error/error";
import { memo, useEffect, useState } from "react";

const Detail = () => {
  // Obtenemos el id del país desde los parámetros de la ruta
  const { id } = useParams();
  // Definimos el estado para el país y el error
  const [country, setCountry] = useState({});
  const [error, setError] = useState({});
  // Definimos una función asíncrona para obtener los datos del país

  const getCountry = async () => {
    try {
      const { data } = await axios(`/countries/${id}`);
      setCountry(data);
      setError({});
    } catch (error) {
      error.response
        ? setError({
            ...error,
            status: error.response.status,
            message: error.response.statusText,
            description: error.response.data.error,
          })
        : setError({
            ...error,
            status: "500",
            message: error.message,
            description: "Failed to load resource",
          });
    }
  };

  // Usamos el hook useEffect para llamar a getCountry cuando el componente se monta
  useEffect(() => {
    getCountry();
  }, []);

  return (
    <div className={styles.principalContainer}>
      {country.id ? (
        // Si tenemos los datos del país, los mostramos
        <div className={styles.detailContainer}>
          <div className={styles.titleDetail}>
            <h2>Siglas: {country.id}</h2>
          </div>
          <div className={styles.bannerFlag}>
            <h2>{country.name}</h2>
            <img
              className={styles.image}
              src={country.flag}
              alt="Flag country"
            ></img>
          </div>
          <div className={styles.contentDetail}>
            <div>
              <h4>Continente: {country.continent}</h4>
              {country.capital && (
                <h4>Capital: {country.capital.join(" - ")}</h4>
              )}
            </div>
            {country.subregion && <h5>Subregion: {country.subregion}</h5>}
            {country.area && <h5>Area: {country.area}</h5>}
            <h5>Poblacion: {country.population} p</h5>
            {country.activities.length > 0 && (
              <h5>
                Actividades:{" "}
                {country.activities
                  .map((activity) => activity.name)
                  .join(" - ")}
              </h5>
            )}
          </div>
        </div>
      ) : (
        // Si no tenemos los datos del país, mostramos el error
        <>
          {error.status && (
            <Error
              status={error.status}
              message={error.message}
              description={error.description}
            />
          )}
        </>
      )}
    </div>
  );
};

export default memo(Detail);
