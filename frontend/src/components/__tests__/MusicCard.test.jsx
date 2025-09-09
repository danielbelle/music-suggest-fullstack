import React from "react";
import { render, screen } from "@testing-library/react";
import MusicCard from "../music/MusicCard";

const mockMusic = {
  id: 1,
  titulo: "Test Song",
  artista: "Test Artist",
  thumb: "https://example.com/thumb.jpg",
  audio: "https://example.com/audio.mp3",
  genero: "Rock",
  duracao: "3:45",
  visualizacoes: 1500,
  youtube_id: "test123",
};

test("renders music information", () => {
  render(<MusicCard musica={mockMusic} index={0} />);

  expect(screen.getByText("Test Song")).toBeInTheDocument();
  expect(screen.getByText("1.5k visualizações")).toBeInTheDocument();
  expect(screen.getByAltText("Test Song")).toHaveAttribute(
    "src",
    "https://example.com/thumb.jpg"
  );
});

test("renders music position", () => {
  render(<MusicCard musica={mockMusic} index={0} />);

  expect(screen.getByText("#1")).toBeInTheDocument();
});

test("renders watch button", () => {
  render(<MusicCard musica={mockMusic} index={0} />);

  expect(screen.getByText("Assistir")).toBeInTheDocument();
});

// Teste adicional para verificar diferentes posições
test("renders different positions correctly", () => {
  render(<MusicCard musica={mockMusic} index={4} />); // ← Posição 5

  expect(screen.getByText("#5")).toBeInTheDocument();
});
