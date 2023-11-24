import { useNavigate } from "react-router-dom";
import styles from "../css-modules/card.module.css";

const Card = ({ id, image, name, continent }) => {
  const navigate = useNavigate();

  const handleSelect = () => {
    navigate(`/detail/${id}`);
  };
  //se establece un rol para poder testear el componente
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

export default Card;
