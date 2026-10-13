'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import css from './UserNav.module.css'

type UserNavProps = {
    inBurgerMenu?: boolean
}

const UserNav = ({ inBurgerMenu = false }: UserNavProps) => {
    const pathname = usePathname()
    const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

    return(
        <nav className={`${css.nav} ${inBurgerMenu ? css.inBurgerMenu : ""}`} aria-label="Main Navigation">
            <ul className={css.list}>
                <li className={css.item}>
                    <Link href="/recommended" aria-label='Home' aria-current={isActive("/recommended") ? "page" : undefined}>Home</Link>
                </li>
                <li className={css.item}>
                    <Link href="/library" aria-label="My library" aria-current={isActive("/library") ? "page" : undefined}>My library</Link>
                </li>
            </ul>
        </nav>
    )
}

export default UserNav