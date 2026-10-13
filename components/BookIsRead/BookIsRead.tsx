import Image from 'next/image'
import css from './BooksIsRead.module.css'

const BookIsRead = () => {
    return (
        <div className={css.wrap}>
            <picture>
                <source
                    srcSet="/books.webp, /bookMob2x.webp"
                />
                <Image
                    className={css.img}
                    src="/books.webp"
                    alt="iphone15"
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