import React, { useState, useEffect } from "react";

function Test() {
  const [lyrics, setLyrics] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [songTitle, setSongTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [albumCover, setAlbumCover] = useState("");
  const [songDetails, setSongDetails] = useState({});

  const handleGetLyrics = () => {
    setIsLoading(true);

    fetch(
      `/lyrics?artist=${encodeURIComponent(
        artistName
      )}&title=${encodeURIComponent(songTitle)}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLyrics(data.lyrics);
        setAlbumCover(data.albumCover);
        setSongDetails({
          title: data.title,
          artist: data.artist,
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setLyrics("");
    setAlbumCover("");
    setSongDetails({});
  }, [songTitle, artistName]);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Song Title"
          value={songTitle}
          onChange={(e) => setSongTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Artist Name"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
        />
        <button onClick={handleGetLyrics}>Get Lyrics</button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {songDetails.title && (
            <div>
              <img src={albumCover} alt="Album cover" />
              <h1>{songDetails.title}</h1>
              <h2>{songDetails.artist}</h2>
            </div>
          )}
          <pre>{lyrics}</pre>
        </div>
      )}
    </div>
  );
}

export default Test;
