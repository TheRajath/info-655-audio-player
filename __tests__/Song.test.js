import React from "react";
import { render, screen } from "@testing-library/react";
import Song from "../src/Song";
import '@testing-library/jest-dom';

describe('Song Display', () => {
  test('Shows title, artist, and year correctly', () => {
    render(<Song title="Imagine" artist="John Lennon" year={1971} />);
    
    expect(screen.getByText("Imagine")).toBeInTheDocument();
    expect(screen.getByText(/Artist: John Lennon/)).toBeInTheDocument();
    expect(screen.getByText(/Year: 1971/)).toBeInTheDocument();
  });

  test('Handles missing artist gracefully', () => {
    render(<Song title="Imagine" year={1971} />);
    expect(screen.getByText(/Artist:/)).toBeInTheDocument();
  });

  test('Handles year when given as a string', () => {
    render(<Song title="Imagine" artist="John Lennon" year="1971" />);
    expect(screen.getByText(/Year: 1971/)).toBeInTheDocument();
  });
});
