import React from "react";

const Podcast = ({ season, episode, episodeTitle }) => {
  return (
    <div className="podcast">
      <h3>{episodeTitle}</h3>
      <p>
        {season !== undefined
          ? `Season ${season} Episode ${episode}`
          : `Episode ${episode}`}
      </p>
    </div>
  );
};

export default Podcast;
