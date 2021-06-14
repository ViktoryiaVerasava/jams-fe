import { useState } from "react";
import { useRouter } from 'next/router'
import styles from "../styles/Song.module.css";
import Button from "./shared/Button";

const Song = ({ song }) => {
  const BE_URL = process.env.NEXT_PUBLIC_BE_URL;

  let [loading, setLoading] = useState(false);
  const router = useRouter()

  const createJam = async () => {
    setLoading(true);
    await fetch(`${BE_URL}/jams`, {
      method: "POST",
      body: JSON.stringify({ songId: song.id }),
      headers: { "Content-Type": "application/json" },
    });
    setLoading(false);
    router.push('/');
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
