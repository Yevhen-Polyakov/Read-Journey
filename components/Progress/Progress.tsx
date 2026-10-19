import Image from 'next/image'
import css from './Progress.module.css'

const Progress = () => {
    return(
        <div className={css.wrap}>
            <h3 className={css.title}>Progress</h3>
            <p className={css.text}>Here you will see when and how much you read. To record, click on the red button above.</p>

            <div className={css.starWrap}>
                <Image src='/star.webp' alt='star' width={32} height={32}/>
            </div>
        </div>
    )
}

export default Progress