import css from './Recommended.module.css'
import RecommendedClient from "./Recommended.client"

const Recommended = () => {

    return(
        <div className={css.recommended}>
            <RecommendedClient />
            
        </div>
    )
}

export default Recommended