// Importamos el hook useNavigate de react-router-dom para manejar la navegación
import { useNavigate } from "react-router-dom";

// Importamos los estilos específicos para el componente de la tarjeta
import styles from "../css-modules/card.module.css";

// Definimos el componente Card
const Card = ({ id, image, name, continent }) => {
  // Usamos el hook useNavigate para obtener la función de navegación
  const navigate = useNavigate();

  // Definimos una función que nos lleva a la página de detalle del país
  const handleSelect = () => {
    navigate(`/detail/${id}`);
  };

  // Retornamos el JSX para el componente
  // Si el nombre del país está definido, mostramos la tarjeta
  // Si no, no mostramos nada (retornamos null)
  return name ? (
    <div
      key={id}
      role="dialog"
      onClick={handleSelect}
      className={styles.cardContainer}
    >
      <h3 className={styles.name}>{name}</h3>
      <img className={styles.image} src={image} alt="bandera del pais" />
      <h4 className={styles.continent}>{continent}</h4>
    </div>
  ) : null;
};

// Exportamos el componente para poder usarlo en otros lugares de nuestra aplicación
export default Card;
