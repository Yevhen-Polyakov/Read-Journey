import css from './Loader.module.css'

const Loader = () => {
    return (
        <div className={css.wrap} role="status" aria-label="Loading">
            <div className={css.book} aria-hidden="true">
                <span className={css.page} />
                <span className={css.page} />
                <span className={css.page} />
                <span className={css.page} />
            </div>
        </div>
    )
}

export default Loader
