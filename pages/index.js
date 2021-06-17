import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";

import Button from "../components/shared/Button";
import Jams from "../components/JamList";
import styles from "../styles/Jams.module.css";

export default function Home() {
  const [leftSectionType, setLeftSectionType] = useState("my");
  const [rightSectionType, setRightSectionType] = useState("all");

  const router = useRouter();

  useEffect(() => {
    const { participations } = router.query;
    const { available } = router.query;
    setLeftSectionType(!!participations ? "participations" : "my");
    setRightSectionType(!!available ? "available" : "all");
  }, [router.query]);

  return (
    <div className={styles.container}>
      <Jams type={leftSectionType} />
      <Jams type={rightSectionType} />
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
