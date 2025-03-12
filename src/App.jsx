import React, { useState, useEffect } from "react";
import Playlist from "./Playlist";
import Status from "./Status";
import Controls from "./Controls";
import "./index.css";

const App = () => {
  const [playlist, setPlaylist] = useState([]);
  const [shuffledPlaylist, setShuffledPlaylist] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/TheRajath/audio-json/refs/heads/master/audio.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPlaylist(data.audio);
        setShuffledPlaylist(data.audio);
      })
      .catch((error) => console.error("Error loading playlist:", error));
  }, []);

  const handleShuffleUpdate = (newShuffledPlaylist) => {
    setShuffledPlaylist(newShuffledPlaylist);
  };

  const getTrackTitle = (track) =>
    track?.title || track?.episodeTitle || "Unknown Track";

  const handleTrackSelect = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleNext = () => {
    if (!shuffledPlaylist.length) return;
    const currentIndex = shuffledPlaylist.findIndex(
      (item) => item === currentTrack
    );
    const nextTrack =
      shuffledPlaylist[(currentIndex + 1) % shuffledPlaylist.length];
    setCurrentTrack(nextTrack);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (!shuffledPlaylist.length) return;
    const currentIndex = shuffledPlaylist.findIndex(
      (item) => item === currentTrack
    );
    const prevTrack =
      shuffledPlaylist[
        (currentIndex - 1 + shuffledPlaylist.length) % shuffledPlaylist.length
      ];
    setCurrentTrack(prevTrack);
    setIsPlaying(true);
  };

  const statusMessage = currentTrack
    ? isPlaying
      ? `Playing: ${getTrackTitle(currentTrack)}`
      : "Paused"
    : "Select a track";

  return (
    <div className="container">
      <h1>My Music & Podcast Playlist</h1>
      <Status status={statusMessage} />
      <Controls
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrev={handlePrev}
        isPlaying={isPlaying}
      />
      <Playlist
        onTrackSelect={handleTrackSelect}
        playlist={playlist}
        updateShuffledPlaylist={handleShuffleUpdate}
      />
    </div>
  );
};

export default App;
