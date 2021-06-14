import { FiHeart } from "react-icons/fi";

import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
    <span>
      Create music with us ! {"  "}
      <FiHeart />
    </span>
  </footer>
  );
};

export default Footer;
