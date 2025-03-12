import React from "react";

const Song = ({ title, artist, year }) => {
  return (
    <div className="song">
      <h3>{title}</h3>
      <p>Artist: {artist}</p>
      <p>Year: {year}</p>
    </div>
  );
};

export default Song;
