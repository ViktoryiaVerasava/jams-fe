import Link from "next/link";

import styles from "../../styles/shared/ToMain.module.css";

const ToMain = () => {
  return (
    <div className={styles.toMain}>
      <Link href="/">Go to jams page</Link>
    </div>
  );
};

export default ToMain;
