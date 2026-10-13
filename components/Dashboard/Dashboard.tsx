import css from './Dashboard.module.css'

type Props = {
    children: React.ReactNode;
}
const Dashboard = ({children}: Props) => {
    return(
        <div className={css.dashboard}>
            {children}
        </div>
    )
}

export default Dashboard