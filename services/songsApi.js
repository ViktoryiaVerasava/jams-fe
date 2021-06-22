const getAllSongs = async () => {
  const songsRespose = await fetch(`${process.env.BE_URL}/songs`);
  const songs = await songsRespose?.json();
  return songs.data;
};

export { getAllSongs };
