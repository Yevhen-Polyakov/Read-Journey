import Header from "@/components/Header/Header";
import css from './PrivateLayout.module.css'

type PrivateLayoutProps = {
    children: React.ReactNode;
    modal: React.ReactNode;
}

export default function PrivateLayout({children, modal}: PrivateLayoutProps){
    return(
        <div className={`${css.private} container`}>
            <Header/>
            <main>
                {children}
                {modal}

            </main>
        </div>
    )
}