import React from "react";

const Controls = ({ onPlayPause, onNext, onPrev, isPlaying }) => {
    return (
        <div className="controls">
            <button onClick={onPrev}>⏮ Prev</button>
            <button onClick={onPlayPause}>{isPlaying ? "⏸ Pause" : "▶ Play"}</button>
            <button onClick={onNext}>⏭ Next</button>
        </div>
    );
};

export default Controls;
