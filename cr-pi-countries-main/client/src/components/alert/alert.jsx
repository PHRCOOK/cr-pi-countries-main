// Importamos los estilos específicos para el componente de alerta
import styles from "../css-modules/alert.module.css";

// Definimos el componente Alert
const Alert = ({ onClose }) => {
  // Retornamos el JSX para el componente
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {/*El botón para cerrar la alerta, que llama a la función onClose cuando
        se hace clic en él*/}
        <span className={styles.cerrar} onClick={onClose}>
          &times;
        </span>
        {/*El mensaje de la alerta*/}
        <p>Actividad creada exitosamente!!</p>
        {/*El botón para aceptar la alerta, que también llama a la función
        onClose cuando se hace clic en él*/}
        <button onClick={onClose}>Aceptar</button>
      </div>
    </div>
  );
};

// Exportamos el componente para poder usarlo en otros lugares de nuestra aplicación
export default Alert;
