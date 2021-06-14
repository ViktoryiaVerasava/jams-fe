import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Jamming</h1>
      <p className={styles.description}>
        Participate in the trending music jams
      </p>
    </div>
  );
};

export default Header;
