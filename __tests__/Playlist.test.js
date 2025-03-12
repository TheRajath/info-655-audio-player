import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Playlist from "../src/Playlist";
import '@testing-library/jest-dom';

const sampleTracks = [
  { title: "Imagine", artist: "John Lennon", year: 1971 },
  { episodeTitle: "Tech Talk", episode: 3 }
];

describe('Playlist Interactions', () => {
  test('Shows an empty message when no tracks are available', () => {
    render(<Playlist playlist={[]} />);
    expect(screen.getByText(/No tracks available/)).toBeInTheDocument();
  });

  test('Lets the user shuffle the playlist', () => {
    const shuffleMock = jest.fn();
    render(<Playlist playlist={sampleTracks} updateShuffledPlaylist={shuffleMock} />);
    
    fireEvent.click(screen.getByText("Shuffle"));
    expect(shuffleMock).toHaveBeenCalled();
  });

  test('Allows selecting a track by double-clicking', () => {
    const selectMock = jest.fn();
    render(<Playlist playlist={sampleTracks} onTrackSelect={selectMock} />);
    
    fireEvent.doubleClick(screen.getByText("Imagine"));
    expect(selectMock).toHaveBeenCalledWith(sampleTracks[0]);
  });
});
