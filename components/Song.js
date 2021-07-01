import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Song.module.css";
import Button from "./shared/Button";
import { JamsApi } from "../services";

const Song = ({ song, token }) => {
  let [loading, setLoading] = useState(false);
  const router = useRouter();

  const createJam = async () => {
    setLoading(true);
    await JamsApi.createJam(song.id, token);
    setLoading(false);
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.title}> {song.name}</div>
        <div className={styles.instruments}>
          {song.instruments.map((instrument, i) => (
            <div key={i} className={styles.instrument}>
              {instrument}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.buttons}>
        <Button label="Create jam" onClick={createJam} disabled={loading} />
      </div>
    </div>
  );
};

export default Song;
