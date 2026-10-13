import Image from "next/image"
import css from "./Hero.module.css"

const Hero = () => {
    return (
       <section className={css.hero}>
            <picture>
                <source
                    srcSet="/iPhone15-Black-1x.webp 1x, /iPhone15-Black-2x.webp 2x"
                />
                <Image
                    className={css.img}
                    src="/iPhone15-Black-1x.webp"
                    alt="iphone15"
                    width={255}
                    height={331}
                />
            </picture>
       </section> 
    )
}

export default Hero