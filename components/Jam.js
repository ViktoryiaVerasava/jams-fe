import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "../styles/Jam.module.css";
import Button from "./shared/Button";
import { JamsApi } from "../services";

const Jam = ({ jam, my, available, reloadJams, token }) => {
  const BE_URL = process.env.NEXT_PUBLIC_BE_URL;
  const router = useRouter();

  let [joining, setJoining] = useState(false);
  let [starting, setStarting] = useState(false);
  let [isReadyForStarting, setIsReadyForStarting] = useState(false);

  useEffect(() => {
    const instruments = jam?.song?.instruments;
    const participants = jam?.participants;
    if (my && instruments.length === participants?.length) {
      setIsReadyForStarting(true);
    } else setIsReadyForStarting(false);
  }, [jam, starting]);

  const handleStartJamClick = async (event) => {
    event.preventDefault();
    setStarting(true);
    await JamsApi.startJam(jam.id, token);
    reloadJams();
  };

  const handleJoinJamClick = async (event) => {
    event.preventDefault();
    setJoining(true);
    await JamsApi.joinJam(jam.id, token);
    reloadJams();
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.title}>
          {jam.id}. {jam.song.name}
        </div>
        <div className={styles.instruments}>
          {jam.song.instruments.map((instrument, i) => (
            <div key={i} className={styles.instrument}>
              {instrument}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.buttons}>
        {!jam.isStarted ? (
          isReadyForStarting ? (
            <Button
              label="Start jam"
              onClick={handleStartJamClick}
              disabled={starting}
            />
          ) : (
            ""
          )
        ) : (
          <Button disabled label="Started" />
        )}

        {available ? (
          <Button
            label="Join jam"
            onClick={handleJoinJamClick}
            disabled={joining}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Jam;
