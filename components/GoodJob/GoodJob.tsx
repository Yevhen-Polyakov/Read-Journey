import css from './GoodJob.module.css'
import Image from "next/image"

const GoodJob = () => {
    return(
        <div className={css.goodWrap}>
            <picture>
                    <source
                        media="(min-width: 768px)"
                        srcSet="/goodDesc1x.webp, /goodDesc2x.webp"
                    />
                    <source
                        media="(max-width: 767px)"
                        srcSet="/good1x.webp, /good2x.webp"
                    />
                    <Image
                        className={css.img}
                        src="/good1x.webp"
                        alt="Books"
                        width={50}
                        height={50}
                    />
                </picture>

                <div className={css.textWrap}>
                    <h1 className={css.title}>Good job</h1>
                    <p className={css.text}>Your book is now in <span className={css.span}>the library!</span> the library! The joy knows no bounds and now you can start your training</p>
                </div>

        </div>
    )
}

export default GoodJob