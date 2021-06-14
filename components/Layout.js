import styles from "../styles/Layout.module.css";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Header/>
        {children}
        <Footer/>
      </main>
    </div>
  );
};

export default Layout;
