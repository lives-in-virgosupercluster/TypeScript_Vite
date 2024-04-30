
import styles from "./navbar.module.css";


export const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.desc}>
        <h1 className={styles.title}>BMI Calculator</h1>
        <p className={styles.para}>
          Use this calculator to check your body mass index (BMI).
        </p>
      </div>
      <div className={styles.logo}>
        <img
          src="/Calculator.png"
          alt="pic"
          width={50}
          height={50}
          className={styles.image}
        ></img>
      </div>
    </div>
  );
};
