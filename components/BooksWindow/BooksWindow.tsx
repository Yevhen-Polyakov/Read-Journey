import Image from "next/image"
import css from './BookWindow.module.css'

const BookWindow = () => {
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

            <p className={css.text}>&ldquo;Books are <span className={css.span}>windows</span> to the world, and reading is a journey into the unknown.&rdquo;</p>
        </div>
    )
}

export default BookWindow