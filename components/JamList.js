import Link from "next/link";
import React, { useEffect, useState } from "react";

import JamType from "../enums/JamType.enum";
import Jam from "./Jam";
import styles from "../styles/Jams.module.css";
import { JamsApi } from "../services";

const Jams = ({ type, reloadJams, token }) => {
  const [jams, setJams] = useState([]);
  const [innerType, setInnerType] = useState(type);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(async () => {
    let updatedJams;
    setLoading(true);
    switch (type) {
      case JamType.My:
        setTitle("You are hosting these jams:");
        updatedJams = await JamsApi.getJams(JamType.My, token);
        break;
      case JamType.Participations:
        setTitle("You are participating in these jams:");
        updatedJams = await JamsApi.getJams(JamType.Participations, token);
        break;
      case JamType.Available:
        setTitle("Pending jams available for you to join:");
        updatedJams = await JamsApi.getJams(JamType.Available, token);
        break;
      default:
        setTitle("All existing jams:");
        updatedJams = await JamsApi.getJams(JamType.All, token);
        break;
    }
    setLoading(false);
    setInnerType(type);
    setJams(updatedJams);
  }, [type, reloadJams]);

  return (
    <div className={styles.list}>
      <>
        <h5 className={styles.titleLine}>{title} </h5>
        {jams.length ? (
          <>
            {loading ? (
              <h5>loading ... </h5>
            ) : (
              <ul>
                {jams.map((jam) => (
                  <li key={jam.id}>
                    <Link href="jams/[id]" as={`jams/${jam.id}`}>
                      <a>
                        <Jam
                          jam={jam}
                          my={innerType === "my"}
                          available={innerType === "available"}
                          reloadJams={reloadJams}
                          token={token}
                        />
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <h5 className={styles.jams__empty}>Jams list is empty</h5>
        )}
      </>
    </div>
  );
};

export default Jams;
