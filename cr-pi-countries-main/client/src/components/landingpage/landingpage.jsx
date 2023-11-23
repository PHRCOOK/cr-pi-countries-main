import styles from "../css-modules/landingpage.module.css";
import mundo from "../../assets/mundogirando.gif";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/home");
  };

  return (
    <div className={styles.container}>
      <div>
        <button className={styles.buttonInicio} onClick={goToHome}>
          INICIA TU AVENTURA
        </button>
      </div>
      <div className={styles.imageContainer}>
        <img className={styles.img2} src={mundo} alt="imagen del mundo" />
      </div>
    </div>
  );
};

export default LandingPage;
