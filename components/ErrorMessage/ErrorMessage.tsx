'use client'

import Button from "../Button/Button";
import css from "./ErrorMessage.module.css";

type Props = {
    error: Error;
    reset: () => void;
}

const ErrorMessage = ({ error, reset }: Props) => {
    return (
        <div className={css.wrap} role="alert">
            <div className={css.icon} aria-hidden="true">!</div>
            <h1 className={css.title}>Something went wrong</h1>
            <p className={css.message}>{error.message}</p>

            <Button className={css.button} variant="addBook" type="button" onClick={reset}>
                Try again
            </Button>
        </div>
    )
}

export default ErrorMessage
