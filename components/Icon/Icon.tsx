import  css from "./Icon.module.css"

type iconProps = { 
    className?: string;
    variant?: "eye" | "eye-off" | "logo" | "burger" | "close" | "arrow" | "next" | "prev" |"selectArrow" | "delete" | "chart" | "hours" | "pieChart" |"read" | "stop" | "hourGlass" | "pie-chart" | "square" | "graphic" | "trash";
    style?: React.CSSProperties;
    onClick?: () => void;
}

const Icon = ({ className = "", variant, ...props}: iconProps) => {

     const  iconClassName = [css.icon, variant && css[variant], className].filter(Boolean).join(" ")
    return(
        
        <svg aria-hidden="true" className={iconClassName} {...props}>
            <use href={`/sprite.svg#icon-${variant}`}/>
        </svg>
    )
}

export default Icon