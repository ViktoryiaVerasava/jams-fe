import Link from "next/link";
import styles from "../styles/Menu.module.css";

const MenuItem = ({ config, closeMenu }) => {
  return (
    <Link href={config.content}>
      <div className={styles.menuItem} onClick={closeMenu}>
        <a>{config.label}</a>
      </div>
    </Link>
  );
};

export default MenuItem;
