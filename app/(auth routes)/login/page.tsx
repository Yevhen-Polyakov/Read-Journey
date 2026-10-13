import AuthSection from "@/components/AuthSection/AuthSection"
import css from "../register/Register.module.css"
import Hero from "@/components/Hero/Hero"
import LoginForm from "@/components/LoginForm/LoginForm"


const Login = () => {


    return (
        <div className={`${css.registerPage} container`}>

            <AuthSection>
               <LoginForm/> 
            </AuthSection>
            <Hero/>
            
        </div>
    )
}

export default Login