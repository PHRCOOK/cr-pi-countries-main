import styles from './page.module.css'
import Card from '../card/card'
//renderiza una pagina con los countries que le llegan por props
const Page = ({countriesSelect}) => {

    return (
        <>
            {countriesSelect ?
            <div className={styles.cardsContainer}>
                {countriesSelect.map((elem,index)=>
                    <Card key={index} id={elem.id} name={elem.name} continent={`Continent: ${elem.continent}`} image={elem.flag}/>
                )}
            </div>:
            null}
        </>
    )
}

export default Page