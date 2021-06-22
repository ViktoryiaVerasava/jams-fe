import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Button from "./shared/Button";
import JamType from "../enums/JamType.enum";
import Jam from "./Jam";
import styles from "../styles/Jams.module.css";
import { JamsApi } from "../services";

const Jams = ({ type, reloadJams }) => {
  const [jams, setJams] = useState([]);
  const [innerType, setInnerType] = useState(type);
  const [loading, setLoading] = useState(false);
  const [alternativeTypeLabel, setAlternativeTypeLabel] = useState("");
  const [title, setTitle] = useState("");

  const router = useRouter();

  const changeQueryParams = () => {
    const query = router.query;
    delete query[type];
    const queryString = Object.keys(query)
      ?.reduce((el, acc) => {
        return `${acc}${el}=${true}&`;
      }, "")
      .slice(0, -1);
    router.push(
      `?${queryString}${queryString ? "&" : ""}${alternativeTypeLabel}=true`
    );
  };

  useEffect(async () => {
    let updatedJams;
    setLoading(true);
    switch (type) {
      case JamType.My:
        setTitle("You are hosting these jams:");
        setAlternativeTypeLabel(JamType.Participations);
        updatedJams = await JamsApi.getJams(JamType.My);
        break;
      case JamType.Participations:
        setTitle("You are participating in these jams:");
        setAlternativeTypeLabel(JamType.My);
        updatedJams = await JamsApi.getJams(JamType.Participations);
        break;
      case JamType.Available:
        setTitle("Pending jams available for you to join:");
        setAlternativeTypeLabel(JamType.All);
        updatedJams = await JamsApi.getJams(JamType.Available);
        break;
      default:
        setTitle("All existing jams:");
        setAlternativeTypeLabel(JamType.Available);
        updatedJams = await JamsApi.getJams();
        break;
    }
    setLoading(false);
    setInnerType(type);
    setJams(updatedJams);
  }, [type, reloadJams]);

  return (
    <div className={styles.list}>
      <div>
        <h5 className={styles.titleLine}>
          {title}{" "}
          <Button
            label={`Show ${alternativeTypeLabel}`}
            onClick={changeQueryParams}
          ></Button>
        </h5>
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
      </div>
    </div>
  );
};

export default Jams;
