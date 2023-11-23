import styles from  "./alert.module.css"

const Alert = ({onClose}) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent} >
                <span className={styles.cerrar} onClick={onClose}>&times;</span>
                <p>Actividad creada exitosamente!!</p>
                <button onClick={onClose}>Aceptar</button>
            </div>
        </div>
    )
}

export default Alert