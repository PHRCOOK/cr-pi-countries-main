// Importamos los estilos específicos para la página de inicio
import styles from "../css-modules/landingpage.module.css";

// Importamos la imagen del mundo que se mostrará en la página de inicio
import mundo from "../../assets/mundogirando.gif";

// Importamos el hook useNavigate de react-router-dom para manejar la navegación
import { useNavigate } from "react-router-dom";

// Definimos el componente LandingPage
const LandingPage = () => {
  // Usamos el hook useNavigate para obtener la función de navegación
  const navigate = useNavigate();

  // Definimos una función que nos llevará a la página de inicio cuando se haga clic en el botón
  const goToHome = () => {
    navigate("/home");
  };

  // Retornamos el JSX para el componente
  return (
    <div className={styles.container}>
      <div>
        {/* El botón que al hacer clic nos llevará a la página de inicio*/}
        <button className={styles.buttonInicio} onClick={goToHome}>
          INICIA TU VIAJE
        </button>
      </div>
      <div className={styles.imageContainer}>
        {/*La imagen del mundo*/}
        <img className={styles.img2} src={mundo} alt="imagen del mundo" />
      </div>
    </div>
  );
};

export default LandingPage;

// Exportamos el componente para poder usarlo en otros lugares de nuestra aplicación
