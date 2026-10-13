'use client'

import { useState } from "react"
import Button from "../Button/Button"
import Icon from "../Icon/Icon"
import css from './BurgerMenu.module.css'
import cssBurger from '../Icon/Icon.module.css'
import cssClose from '../Button/Button.module.css'
import UserNav from "../UserNav/UserNav"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store/authStore"
import { logout } from "@/lib/api/clientApi"
import toast from "react-hot-toast"
import axios from "axios"

const BurgerMenu = () => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const clearIsAuthenticated = useAuthStore((state)=> state.clearIsAuthenticated)

    const handleLogout = async () => {
        setIsOpen(false)

        try{
            await logout()
            clearIsAuthenticated()
            router.replace('/login')
        } catch(error) {
            const message = axios.isAxiosError(error) 
            ? error.response?.data?.error ?? 'Logout failed'
            : 'Something went wrong'
            toast.error(message)
        } 
    }

    return (
        <>
            <Button 
                variant="burger"
                onClick={()=> setIsOpen(true)}>
                <Icon className={cssBurger.iconBurger} variant="burger"/>
            </Button>

            {isOpen && (
                <div className={css.backdrop}>
                    <div className={css.menu}>
                        <Button 
                            className={cssClose.closeBurger}
                            type="button" 
                            aria-label="Close Burger" 
                            onClick={()=> setIsOpen(false)}>

                            <Icon variant="close" className={css.Close}/>
                        </Button>

                        <UserNav inBurgerMenu />

                        <Button 
                            onClick={handleLogout}
                            variant="logout" 
                            aria-label="logout" 
                            type="button">
                                Log out
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}

export default BurgerMenu