'use client'
import { useAuthStore } from '@/lib/store/authStore'
import css from './UserBar.module.css'

const UserBar = () => {
    const user = useAuthStore((state) => state.user)
    return (
        <div className={css.userBarWrap}>
            <div className={css.userBar}>
            
                <span className={css.span}>{user?.name?.charAt(0).toUpperCase()}</span>
            </div>

            <span className={css.name}>{user?.name}</span>
        </div>
        
    )
}

export default UserBar