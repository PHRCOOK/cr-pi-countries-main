// Importamos los hooks necesarios de React y Redux
import { useDispatch } from "react-redux";
import { resetError } from "../../redux/actions";

// Importamos los estilos específicos para el componente de error
import styles from "../css-modules/error.module.css";

// Importamos el hook useNavigate de react-router-dom para manejar la navegación
import { useNavigate } from "react-router-dom";

// Definimos el componente Error
const Error = ({ status, message, description, reset }) => {
  // Usamos el hook useNavigate para obtener la función de navegación
  const navigate = useNavigate();

  // Usamos el hook useDispatch para obtener la función de despacho de Redux
  const dispatch = useDispatch();

  // Definimos una función que resetea el error y nos lleva a la página de inicio
  const handleReset = () => {
    dispatch(resetError());
    navigate("/home");
  };

  // Retornamos el JSX para el componente
  return (
    <div className={styles.errorContainer}>
      <div className={styles.cardError}>
        <div>{message ? <h2>{message}</h2> : <h2>Not Found!</h2>}</div>
        <div>{status ? <h1>{status}</h1> : <h1>404</h1>}</div>
        <div>{description ? <h3>{description}</h3> : null}</div>
        <div>
          {reset && (
            <button className={styles.closeError} onClick={handleReset}>
              Cerrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Exportamos el componente para poder usarlo en otros lugares de nuestra aplicación
export default Error;
