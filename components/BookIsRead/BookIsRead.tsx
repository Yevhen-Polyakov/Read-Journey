import Image from 'next/image'
import css from './BooksIsRead.module.css'

const BookIsRead = () => {
    return (
        <div className={css.wrap}>
            <picture>
                <source
                    media="(min-width: 1440px)"
                    srcSet="/bookImgDesktop1x.webp 1x, /bookImgDesktop2x.webp 2x"
                    />
                <source
                    media="(max-width: 1439px)"
                    srcSet="/books.webp 1x, /bookMob2x.webp 2x"
                    />
                <Image
                    className={css.img}
                    src="/books.webp"
                    alt="Books"
                    width={50}
                    height={50}
                />
            </picture>

            <div className={css.textWrap}>
                <h3 className={css.title}>The book is read</h3>
                <p className={css.text}>It was an <span className={css.span}>exciting journey</span>, where each page revealed new horizons, and the characters became inseparable friends.</p>
            </div>
        </div>
    )
}

export default BookIsRead