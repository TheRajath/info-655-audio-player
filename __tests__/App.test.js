import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../src/App";
import '@testing-library/jest-dom';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { title: "Imagine" },
      { title: "Bohemian Rhapsody" },
      { title: "Let It Be" }
    ]),
  })
);

describe('App Full Integration Tests', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('allows a user to double-click a track to play it', async () => {
    render(<App />);
    
    await waitFor(() => {
      fireEvent.doubleClick(screen.getByText("Imagine"));
      expect(screen.getByText(/Playing: Imagine/)).toBeInTheDocument();
    });
  });

  test('clicking "Next" moves to the next track', async () => {
    render(<App />);
    
    await waitFor(() => {
      fireEvent.doubleClick(screen.getByText("Imagine"));
    });

    fireEvent.click(screen.getByText("⏭ Next"));
    expect(screen.getByText(/Playing: Bohemian Rhapsody/)).toBeInTheDocument();
  });

  test('clicking "Prev" moves to the previous track', async () => {
    render(<App />);
    
    await waitFor(() => {
      fireEvent.doubleClick(screen.getByText("Bohemian Rhapsody"));
    });

    fireEvent.click(screen.getByText("⏮ Prev"));
    expect(screen.getByText(/Playing: Imagine/)).toBeInTheDocument();
  });

  test('clicking "Next" at the last track loops back to the first track', async () => {
    render(<App />);
    
    await waitFor(() => {
      fireEvent.doubleClick(screen.getByText("Let It Be"));
    });

    fireEvent.click(screen.getByText("⏭ Next"));
    expect(screen.getByText(/Playing: Imagine/)).toBeInTheDocument();
  });

  test('clicking "Prev" at the first track loops back to the last track', async () => {
    render(<App />);
    
    await waitFor(() => {
      fireEvent.doubleClick(screen.getByText("Imagine"));
    });

    fireEvent.click(screen.getByText("⏮ Prev"));
    expect(screen.getByText(/Playing: Let It Be/)).toBeInTheDocument();
  });

  test('clicking "Play/Pause" toggles between playing and paused state', async () => {
    render(<App />);
    
    await waitFor(() => {
      fireEvent.doubleClick(screen.getByText("Imagine"));
    });

    fireEvent.click(screen.getByText("⏸ Pause"));
    expect(screen.getByText("Paused")).toBeInTheDocument();

    fireEvent.click(screen.getByText("▶ Play"));
    expect(screen.getByText(/Playing: Imagine/)).toBeInTheDocument();
  });

  test('when paused, clicking "Next" resumes playback on the next track', async () => {
    render(<App />);
    
    await waitFor(() => {
      fireEvent.doubleClick(screen.getByText("Imagine"));
    });

    fireEvent.click(screen.getByText("⏸ Pause"));
    fireEvent.click(screen.getByText("⏭ Next"));

    expect(screen.getByText(/Playing: Bohemian Rhapsody/)).toBeInTheDocument();
  });

  test('when paused, clicking "Prev" resumes playback on the previous track', async () => {
    render(<App />);
    
    await waitFor(() => {
      fireEvent.doubleClick(screen.getByText("Bohemian Rhapsody"));
    });

    fireEvent.click(screen.getByText("⏸ Pause"));
    fireEvent.click(screen.getByText("⏮ Prev"));

    expect(screen.getByText(/Playing: Imagine/)).toBeInTheDocument();
  });
});
