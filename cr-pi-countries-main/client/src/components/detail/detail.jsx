import styles from "../css-modules/detail.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Error from "../error/error";
import { memo, useEffect, useState } from "react";
import { BASE_API_URL, PORT } from "../../apiData";

const Detail = () => {
  const { id } = useParams();

  const [country, setCountry] = useState({});
  const [error, setError] = useState({});

  const getCountry = async () => {
    try {
      const endpoint = `${BASE_API_URL}:${PORT}/countries/${id}`;
      const { data } = await axios(endpoint);
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

  useEffect(() => {
    getCountry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.principalContainer}>
      {country.id ? (
        <div className={styles.detailContainer}>
          <div className={styles.titleDetail}>
            <h2>CCA3: {country.id}</h2>
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
