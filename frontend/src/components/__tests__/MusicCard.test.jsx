import { render, screen } from "@testing-library/react";
import MusicCard from "../music/MusicCard";

describe("MusicCard", () => {
  test("renders music information", () => {
    const mockMusic = {
      id: 1,
      titulo: "Test Song",
      artista: "Test Artist",
      youtube_id: "dQw4w9WgXcQ",
    };

    render(<MusicCard music={mockMusic} />);

    expect(screen.getByText("Test Song")).toBeInTheDocument();
    expect(screen.getByText("Test Artist")).toBeInTheDocument();
  });
});
