import { useRouter } from "next/router";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import Button from "../components/shared/Button";
import Jams from "../components/JamList";
import { getAuthServerSideProps } from "../utils/getAuthServerSideProps";
import styles from "../styles/Jams.module.css";

function Home({ token }) {
  const [leftSectionType, setLeftSectionType] = useState("my");
  const [rightSectionType, setRightSectionType] = useState("all");
  const [updateValue, setUpdateValue] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const { participations } = router.query;
    const { available } = router.query;
    setLeftSectionType(!!participations ? "participations" : "my");
    setRightSectionType(!!available ? "available" : "all");
  }, [router.query]);

  const refreshJams = useCallback(() => {
    setUpdateValue(updateValue + 1);
  }, [updateValue]);

  return (
    <div className={styles.container}>
      <Jams type={leftSectionType} reloadJams={refreshJams} token={token} />
      <Jams type={rightSectionType} reloadJams={refreshJams} token={token} />
      <div className={styles.createButton}>
        <Link href="/songs">
          <a>
            <Button label="Create new jam" />
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Home;

export const getServerSideProps = getAuthServerSideProps;
