import RegisterForm from "@/components/RegisterForm/RegisterForm"
import css from "./Register.module.css"
import AuthSection from "@/components/AuthSection/AuthSection"
import Hero from "@/components/Hero/Hero"

const Register = () => {
    return(
        <div className={`${css.registerPage} container`}>

            <AuthSection>
                <RegisterForm/>
            </AuthSection>
            <Hero/>
            
        </div>

    )
}

export default Register