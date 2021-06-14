import Song from "../components/Song";
import ToMain from "../components/shared/ToMain";
import styles from "../styles/songs.module.css";
import { SongsApi } from "../services";

const Songs = ({ songs }) => {
  return (
    <div className={styles.container}>
      <h5>Songs available:</h5>
      <div>
        <ul>
          {songs.map((song) => (
            <li key={song.id}>
              <Song song={song} />
            </li>
          ))}
        </ul>
      </div>
      <ToMain />
    </div>
  );
};

export default Songs;

export const getStaticProps = async () => {
  const songs = await SongsApi.getAllSongs();
  return {
    props: { songs },
  };
};
