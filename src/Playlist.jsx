import React, { useState, useEffect } from "react";
import Song from "./Song";
import Podcast from "./Podcast";

const Playlist = ({ onTrackSelect, playlist, updateShuffledPlaylist }) => {
  const [shuffled, setShuffled] = useState([]);

  useEffect(() => {
    setShuffled(playlist);
  }, [playlist]);

  const shufflePlaylist = () => {
    const shuffledArray = [...playlist].sort(() => Math.random() - 0.5);
    setShuffled(shuffledArray);
    updateShuffledPlaylist(shuffledArray);
  };

  if (!shuffled.length) {
    return <p>No tracks available. Check if JSON Server is running.</p>;
  }

  return (
    <div>
      <button onClick={shufflePlaylist}>Shuffle</button>
      <ul className="playlist">
        {shuffled.map((item, index) =>
          item.title ? (
            <li key={index} className="list-item song" onDoubleClick={() => onTrackSelect(item)}>
              <Song {...item} />
            </li>
          ) : (
            <li key={index} className="list-item podcast" onDoubleClick={() => onTrackSelect(item)}>
              <Podcast {...item} />
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Playlist;
