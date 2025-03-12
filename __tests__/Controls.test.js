import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Controls from "../src/Controls";
import '@testing-library/jest-dom';

describe('Controls Interactions', () => {
  test('Toggles play and pause', () => {
    const toggleMock = jest.fn();
    render(<Controls isPlaying={false} onPlayPause={toggleMock} />);
    
    fireEvent.click(screen.getByText("▶ Play"));
    expect(toggleMock).toHaveBeenCalled();
  });

  test('Handles next and previous buttons', () => {
    const nextMock = jest.fn();
    const prevMock = jest.fn();
    render(<Controls onNext={nextMock} onPrev={prevMock} />);
    
    fireEvent.click(screen.getByText("⏭ Next"));
    fireEvent.click(screen.getByText("⏮ Prev"));
    expect(nextMock).toHaveBeenCalled();
    expect(prevMock).toHaveBeenCalled();
  });
});
