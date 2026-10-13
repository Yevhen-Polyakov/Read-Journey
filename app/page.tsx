import styles from "./page.module.css";
import RegisterPage from "./(auth routes)/register/page";

export default function Home() {
  return (
    <div className={styles.home}>
      <RegisterPage/>
    </div>
  );
}
