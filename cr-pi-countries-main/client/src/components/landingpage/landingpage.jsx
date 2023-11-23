import styles from './landingpage.module.css'
import mundo from '../../assets/logo1_mapapapa_mod.png'
import letrero from '../../assets/logo2_mapapapa_mod.png'
import {useNavigate} from 'react-router-dom'


const LandingPage=()=>{
    
    const navigate = useNavigate()
    
    const goToHome = () =>{
        navigate('/home')
    }

    return(
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img className={styles.img1} src= {letrero} alt='bienvedidos aventureros'/>
                <img className={styles.img2} src={mundo} alt='imagen del mundo'/>
            </div>
            <div>
                <button className={styles.buttonInicio} onClick={goToHome}>Inicio</button>
            </div>
        </div>
    )
}

export default LandingPage