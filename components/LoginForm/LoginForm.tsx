"use client"

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Icon from "../Icon/Icon"
import css from "../RegisterForm/RegisterForm.module.css"
import cssIcon from "@/components/Icon/Icon.module.css"
import * as Yup from "yup";
import Button from "../Button/Button";
import Link from "next/link";
import { useState } from "react";
import { loginUser } from "@/lib/api/clientApi";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email is required")
        .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Please enter a valid email"),    
    password: Yup.string()
        .required("Password is required")
        .min(7,  "Password must contain at least 7 characters"),
})

type LoginForm= {
    email: string;
    password: string;
}

const LoginForm = () => {
    const setUser = useAuthStore((state)=> state.setUser)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const [, setError] = useState('')

    const {register, handleSubmit, reset,  formState: {errors}} = useForm<LoginForm>({resolver: yupResolver(loginSchema)})

    const togglePassword = () => {
        setShowPassword(prev => !prev) 
    }

    const onSubmit = async (data: LoginForm) => {
        try{

           const LoginUser =  await loginUser(data)
           if(LoginUser){
            setUser(LoginUser)
            router.push('/recommended')
           } else {
            setError('Invalid email or password')
           }
           reset()
           toast.success("Login successful!")
        } catch(error){
            const message = axios.isAxiosError(error) ? error.response?.data?.error ?? "Login failed" : "Something went wrong"; 
            toast.error(message)
        }
    }
       
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>

            <input
                className={css.input} 
                type="email"
                placeholder="Mail:"
                autoComplete="off"
                {...register("email")} />

                {errors.email && (
                    <p className={css.error}>{errors.email.message}</p>
                )}

            <div className={`${css.passwordWrap} ${css.marginBottom}`}>
                <input
                    className={css.input} 
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Password:"
                    {...register("password")}/>

                    {errors.password && (
                        <p className={css.error}>{errors.password.message}</p>
                    )} 

                <Icon 
                    variant={showPassword ? "eye" : "eye-off"} 
                    className={cssIcon.iconEye}
                    onClick={togglePassword}/>
            </div>    
                
            <div className={css.buttonWrap}>
                <Button 
                    variant="login"
                    type="submit"
                    aria-label="Register">
                    Login
                </Button>  

                    <Link href="/register"><span className={css.spanLink}>Don’t have an account?</span></Link>
            </div>        
        </form>            
    )
}

export default LoginForm