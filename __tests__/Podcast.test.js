import React from "react";
import { render, screen } from "@testing-library/react";
import Podcast from "../src/Podcast";
import '@testing-library/jest-dom';

describe('Podcast Display', () => {
  test('Shows podcast with season and episode', () => {
    render(<Podcast season={1} episode={5} episodeTitle="The History of AI" />);
    expect(screen.getByText("The History of AI")).toBeInTheDocument();
    expect(screen.getByText(/Season 1 Episode 5/)).toBeInTheDocument();
  });

  test('Handles podcasts without a season', () => {
    render(<Podcast episode={3} episodeTitle="Tech Talk" />);
    expect(screen.getByText(/Episode 3/)).toBeInTheDocument();
  });

  test('Handles missing episode number', () => {
    render(<Podcast episodeTitle="Space Exploration" />);
    expect(screen.getByText(/Episode undefined/)).toBeInTheDocument();
  });
});
