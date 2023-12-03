import styles from "../css-modules/page.module.css";
import Card from "../card/card";

// Componente Page que renderiza una lista de países
// Recibe una lista de países como propiedades (countriesSelect)
const Page = ({ countriesSelect }) => {
  return (
    <>
      {countriesSelect ? (
        // Si hay países seleccionados, se renderizan como tarjetas
        <div className={styles.cardsContainer}>
          {countriesSelect.map((elem, index) => (
            // Para cada país, se crea una tarjeta con la información del país
            <Card
              key={index} // key es un prop especial requerido por React
              id={elem.id} // id del país
              name={elem.name} // nombre del país
              continent={`Continent: ${elem.continent}`} // continente del país
              image={elem.flag} // bandera del país
            />
          ))}
        </div>
      ) : null}{" "}
    </>
  );
};

export default Page;
