import React from "react";
import { render, screen } from "@testing-library/react";
import Status from "../src/Status";
import '@testing-library/jest-dom';

describe('Status Component', () => {
  test('displays playing state', () => {
    render(<Status status="Playing: Test Track" />);
    expect(screen.getByText(/Playing: Test Track/)).toBeInTheDocument();
  });

  test('displays paused state', () => {
    render(<Status status="Paused" />);
    expect(screen.getByText("Paused")).toBeInTheDocument();
  });

  test('displays default state', () => {
    render(<Status status="Select a track" />);
    expect(screen.getByText("Select a track")).toBeInTheDocument();
  });
});
