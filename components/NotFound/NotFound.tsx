import Link from 'next/link'
import css from './NotFound.module.css'

const NotFound = () => {
    return (
        <div className={css.wrap}>
            <p className={css.code}>404</p>
            <h1 className={css.title}>Page not found</h1>
            <p className={css.text}>
                Looks like this page was lost between the bookshelves.
            </p>
            <Link className={css.link} href="/">
                Back to home
            </Link>
        </div>
    )
}

export default NotFound
