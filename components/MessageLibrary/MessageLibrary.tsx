import Image from 'next/image'
import css from './MessageLibrary.module.css'

const MessageLibrary = () => {
    return (
        <div className={css.wrap}>
            <div className={css.imgWrap}>
                <picture>
                    <source
                        media="(min-width: 768px)"
                        srcSet="/bookImgDesktop1x.webp 1x, /bookImgDesktop2x.webp 2x"
                    />
                    <source
                        media="(max-width: 767px)"
                        srcSet="/booksImg1x.webp 1x, /bookImg2x.webp 2x"
                    />
                    <Image
                        className={css.img}
                        src="/booksImg1x.webp"
                        alt="Books"
                        width={50}
                        height={50}
                    />
                </picture>
            </div>

            <p className={css.text}>To start training, add <span className={css.span}>some of your books or from the recommended ones</span> some of your books or from the recommended ones</p>
            

        </div>
    )
}

export default MessageLibrary