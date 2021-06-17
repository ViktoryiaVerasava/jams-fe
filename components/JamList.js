import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Button from "./shared/Button";
import JamType from "../enums/JamType.enum";
import Jam from "./Jam";
import styles from "../styles/Jams.module.css";
import { JamsApi } from "../services";

const Jams = ({ type }) => {
  const [jams, setJams] = useState([]);
  const [innerType, setInnerType] = useState(type);
  const [loading, setLoading] = useState([]);
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
    let jams;
    setLoading(true);
    switch (type) {
      case JamType.My:
        jams = await JamsApi.getJams(JamType.My);
        setTitle("You are hosting these jams:");
        setAlternativeTypeLabel(JamType.Participations);
        break;
      case JamType.Participations:
        jams = await JamsApi.getJams(JamType.Participations);
        setTitle("You are participating in these jams:");
        setAlternativeTypeLabel(JamType.My);
        break;
      case JamType.Available:
        jams = await JamsApi.getJams(JamType.Available);
        setTitle("Pending jams available for you to join:");
        setAlternativeTypeLabel(JamType.All);
        break;
      default:
        jams = await JamsApi.getJams();
        setTitle("All existing jams:");
        setAlternativeTypeLabel(JamType.Available);
        break;
    }
    setJams(jams);
    setInnerType(type);
    setLoading(false);
  }, [type]);

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
