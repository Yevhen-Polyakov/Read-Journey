"use client"

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Icon from "../Icon/Icon"
import css from "./RegisterForm.module.css"
import cssIcon from "@/components/Icon/Icon.module.css"
import * as Yup from "yup";
import Button from "../Button/Button";
import Link from "next/link";
import { registerUser } from "@/lib/api/clientApi";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

const registerSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),
    email: Yup.string()
        .required("Email is required")
        .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Please enter a valid email"),    
    password: Yup.string()
        .required("Password is required")
        .min(7,  "Password must contain at least 7 characters"),
})

type RegisterForm= {
    name: string;
    email: string;
    password: string;
}

const RegisterForm = () => {
    const router = useRouter()
    const [showPassword, setShowPassword]= useState(false)
    const {register, handleSubmit, reset, formState: {errors}} = useForm<RegisterForm>({resolver: yupResolver(registerSchema)})
    const setUser = useAuthStore((state)=> state.setUser)
    const [, setError] = useState('')

    const togglePassword = () => {
        setShowPassword(prev => !prev)
    }

    const onSubmit = async (data: RegisterForm) => {
        try{
             const dataUser = await registerUser(data)
             if (dataUser){
                setUser(dataUser)
                router.push('/recommended')
             } else {
                setError('Invalid email or password')
             }
            reset()
            toast.success("Registration successful!")

        } catch(error){
            const message = axios.isAxiosError(error) ? error.response?.data?.error ?? "Registration failed" : "Something went wrong"; 
            toast.error(message)
        }
    }

    return (
    
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>

            <input
                className={`${css.input} ${errors.name ? css.inputError : ""}`} 
                type="text"
                placeholder="Name:"
                {...register("name")}/>

                {errors.name && (
                    <p className={css.error}>{errors.name.message}</p>
                )}

            <input
                className={`${css.input} ${errors.email ? css.inputError : ""}`} 
                type="email"
                autoComplete="off"
                placeholder="Mail:"
                {...register("email")} />

                {errors.email && (
                    <p className={css.error}>{errors.email.message}</p>
                )}

            <div className={css.passwordWrap}>
                <input
                    className={`${css.input} ${errors.password ? css.inputError : ""}`} 
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
                    onClick={togglePassword}
                    />
            </div>    
                
            <div className={css.buttonWrap}>
                <Button 
                    variant="register"
                    type="submit"
                    aria-label="Register">
                    Register
                </Button>  

                    <Link href="/login"><span className={css.spanLink}>Already have an account?</span></Link>
            </div>
                   
        </form>
    )
}

export default RegisterForm
