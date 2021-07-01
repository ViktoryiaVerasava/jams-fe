import { authReqHeaderFromCtx } from "../utils/authReqHeader";

const getAllSongs = async (ctx) => {
  const songsRespose = await fetch(
    `${process.env.BE_URL}/songs`,
    authReqHeaderFromCtx(ctx)
  );
  const songs = await songsRespose?.json();
  return songs.data;
};

export { getAllSongs };
