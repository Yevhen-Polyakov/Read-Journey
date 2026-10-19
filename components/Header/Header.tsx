'use client'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import UserBar from '../UserBar/UserBar'
import UserNav from '../UserNav/UserNav'
import css from './Header.module.css'
import cssBtn from '../Button/Button.module.css'
import { useAuthStore } from '@/lib/store/authStore'
import { logout } from '@/lib/api/clientApi'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Header = () => {
    const router = useRouter()
    const clearIsAuthenticated = useAuthStore((state)=> state.clearIsAuthenticated)

    const handleLogout = async ()=> {
        await logout()
        clearIsAuthenticated()
        router.push('/login')
        
    }
    
    return(
        <header className={css.header}>
            
            <div className={css.wrapLogo}>
                <Link href="/recommended" aria-label="Home">
                    <Icon variant='logo' className={css.marginRight232}/>
                </Link>
                <h3 className={css.logoText}>READ JOURNEY</h3>
            </div>
            
            

            <div className={css.navWrap}>
                <UserNav/>

                <div className={css.wrapInfo}>
                    <UserBar/>
                    <BurgerMenu/>

                    <Button
                        onClick={handleLogout}
                        className={cssBtn.display}
                        variant='logout' 
                        type='button' 
                        aria-label='log out'
                        >
                        Log out
                    </Button>
                </div>
            </div>

        </header>
    )
}

export default Header