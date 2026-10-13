import Link from 'next/link'
import css from './StartWorkout.module.css'
import Icon from '../Icon/Icon'
import cssIcon from '../Icon/Icon.module.css'

const StartWorkout = () => {
    return(
        <div className={css.wrapper}>
            <h2 className={css.title}>Start your workout</h2>

            <ul className={css.list}>
                <li className={css.item}>
                    <div className={css.circle}>1</div>
                        <p className={css.paragraph}>Create a personal library: <span className={css.span}>add the books you intend to read 
                        to it.</span></p>
                </li>

                <li className={css.item}>
                    <div className={css.circle}>2</div>
                        <p className={css.paragraph}>Create your first workout: <span className={css.span}> define a goal, choose a period, start training.</span></p>
                </li>
                
            </ul>

            <div className={css.wrapLink}>
                <Link className={css.link} href='/library'>
                    <span>My library</span>
                    <Icon variant='arrow' className={cssIcon.string}/>
                </Link>
            </div>
            
        </div>

    )
} 

export default StartWorkout