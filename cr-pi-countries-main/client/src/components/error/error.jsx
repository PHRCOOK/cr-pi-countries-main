import { useDispatch } from "react-redux";
import { resetError } from "../../redux/actions";
import styles from "../css-modules/error.module.css";
import { useNavigate } from "react-router-dom";

const Error = ({ status, message, description, reset }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetError());
    navigate("/home");
  };

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

export default Error;
