import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "../../components/Header";

describe("Header", () => {
  it("renders the title", () => {
    render(<Header onCreate={() => {}} />);
    expect(screen.getByText("Superhero Database")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<Header onCreate={() => {}} />);
    expect(
      screen.getByText("Manage your superhero collection")
    ).toBeInTheDocument();
  });

  it("renders the Add Superhero button", () => {
    render(<Header onCreate={() => {}} />);
    expect(screen.getByText("Add Superhero")).toBeInTheDocument();
  });

  it("calls onCreate when Add Superhero button is clicked", () => {
    const mockOnCreate = vi.fn();
    render(<Header onCreate={mockOnCreate} />);

    fireEvent.click(screen.getByText("Add Superhero"));

    expect(mockOnCreate).toHaveBeenCalledTimes(1);
  });
});
