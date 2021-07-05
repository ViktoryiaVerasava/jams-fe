import Song from "../components/Song";
import styles from "../styles/songs.module.css";
import { SongsApi } from "../services";
import { getAuthServerSideProps } from "../utils/getAuthServerSideProps";

const Songs = ({ songs, token }) => {
  return (
    <div className={styles.container}>
      <h5>Songs available:</h5>
      <div>
        <ul>
          {songs.map((song) => (
            <li key={song.id}>
              <Song song={song} token={token} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Songs;

export const getServerSideProps = async (ctx) => {
  const songs = await SongsApi.getAllSongs(ctx);
  const authProps = await getAuthServerSideProps(ctx);
  return {
    ...authProps,
    props: { ...authProps.props, songs },
  };
};
