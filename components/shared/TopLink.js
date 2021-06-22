import Link from "next/link";

import styles from "../../styles/shared/TopLink.module.css";

const TopLink = ({ link = "/", label = "Go to jams page" }) => {
  return (
    <div className={styles.topLink}>
      <Link href={link}>{label}</Link>
    </div>
  );
};

export default TopLink;
