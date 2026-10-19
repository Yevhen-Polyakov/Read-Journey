import css from "./Button.module.css"

type ButtonProps = {
    children: React.ReactNode;
    variant?: "register" | "login" |"burger" | "close" | "logout" | "filter" |"addLibrary" | "addBook" | "delete" ;
    type?: "button" | "submit" | "reset";
    "aria-label"?: string;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
}

const Button = ({children, className = "", variant, ...props }: ButtonProps) => {
    const  buttonClassName = [css.button, variant && css[variant], className].filter(Boolean).join(" ")
    return (
        <button className={buttonClassName} {...props}>{children}</button>
    )
}

export default Button