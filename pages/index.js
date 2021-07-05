import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import Jams from "../components/JamList";
import { getAuthServerSideProps } from "../utils/getAuthServerSideProps";
import styles from "../styles/Jams.module.css";
import JamType from "../enums/JamType.enum";
import Button from "../components/shared/Button";

const typeLabels = Object.keys(JamType);

function Home({ token }) {
  const [jamsType, setJamsType] = useState("all");
  const [updateValue, setUpdateValue] = useState(0);

  const router = useRouter();

  const changeQueryParams = (type) => {
    const query = router.query;
    delete query[type];
    router.push(`?${type}=true`);
  };

  useEffect(() => {
    const { participations, available, my, all } = router.query;

    if (participations) {
      setJamsType(JamType.Participations);
    } else if (available) {
      setJamsType(JamType.Available);
    } else if (my) {
      setJamsType(JamType.My);
    } else if (all) {
      setJamsType(JamType.All);
    }
  }, [router.query]);

  const refreshJams = useCallback(() => {
    setUpdateValue(updateValue + 1);
  }, [updateValue]);

  return (
    <div className={styles.container}>
      <div className={styles.typeSwitch}>
        {typeLabels.map((typeLabel) => (
          <Button
            key={JamType[typeLabel]}
            label={`Show ${typeLabel}`}
            onClick={() => changeQueryParams(JamType[typeLabel])}
            disabled={jamsType === JamType[typeLabel]}
          ></Button>
        ))}
      </div>
      <Jams type={jamsType} reloadJams={refreshJams} token={token} />
    </div>
  );
}

export default Home;

export const getServerSideProps = getAuthServerSideProps;
