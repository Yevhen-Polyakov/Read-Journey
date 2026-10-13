import Icon from "../Icon/Icon";
import css from "./AuthSection.module.css"
import cssIcon from "@/components/Icon/Icon.module.css"

type AuthSectionProps = {
    children: React.ReactNode;
}
const AuthSection = ({children}:AuthSectionProps) => {
    return (
        <section className={css.auth}>

            <div className={css.wrapLogo}>
                <Icon variant="logo" className={`${cssIcon.logo} ${cssIcon.marginBottomLogo}`}/>
                <h3 className={css.logoText}>READ JOURNEY</h3>
            </div>
            
            <h1 className={css.title}>Expand your mind, reading <span className={css.span}>a book</span></h1>
            
            {children}
        </section>
    )
}

export default AuthSection