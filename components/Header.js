import styles from "../styles/Header.module.css";
import Menu from "./Menu";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const pathesWithoutMenu = ["/login", "/register"];

const Header = () => {
  const router = useRouter();
  const [shouldShowMenu, setShouldShowMenu] = useState(false);

  useEffect(() => {
    const { pathname } = router;
    setShouldShowMenu(pathesWithoutMenu.indexOf(pathname) === -1);
  }, [router.pathname]);

  return (
    <div className={styles.header}>
      {shouldShowMenu ? (
        <div className={styles.menu}>
          <Menu />
        </div>
      ) : (
        ""
      )}
      <h1 className={styles.title}>Jamming</h1>
      <p className={styles.description}>
        Participate in the trending music jams
      </p>
    </div>
  );
};

export default Header;
