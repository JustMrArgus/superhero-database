import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SuperheroCard } from "../../components/SuperheroCard";

vi.mock("../../services/api", () => ({
  superheroApi: {
    getImageUrl: (imageName) => `http://localhost:3000/img/heroes/${imageName}`,
  },
}));

describe("SuperheroCard", () => {
  const mockSuperhero = {
    _id: "1",
    nickname: "Superman",
    real_name: "Clark Kent",
    images: ["superman.jpg"],
  };

  const defaultProps = {
    superhero: mockSuperhero,
    onView: vi.fn(),
    onEdit: vi.fn(),
    onDelete: vi.fn(),
  };

  it("renders the superhero nickname", () => {
    render(<SuperheroCard {...defaultProps} />);
    expect(screen.getByText("Superman")).toBeInTheDocument();
  });

  it("renders the superhero image", () => {
    render(<SuperheroCard {...defaultProps} />);
    const image = screen.getByAltText("Superman");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "http://localhost:3000/img/heroes/superman.jpg"
    );
  });

  it("renders View Details, Edit, and Delete buttons", () => {
    render(<SuperheroCard {...defaultProps} />);
    expect(screen.getByText("View Details")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("calls onView with superhero when View Details is clicked", () => {
    const mockOnView = vi.fn();
    render(<SuperheroCard {...defaultProps} onView={mockOnView} />);

    fireEvent.click(screen.getByText("View Details"));

    expect(mockOnView).toHaveBeenCalledTimes(1);
    expect(mockOnView).toHaveBeenCalledWith(mockSuperhero);
  });

  it("calls onEdit with superhero when Edit is clicked", () => {
    const mockOnEdit = vi.fn();
    render(<SuperheroCard {...defaultProps} onEdit={mockOnEdit} />);

    fireEvent.click(screen.getByText("Edit"));

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
    expect(mockOnEdit).toHaveBeenCalledWith(mockSuperhero);
  });

  it("calls onDelete with superhero when Delete is clicked", () => {
    const mockOnDelete = vi.fn();
    render(<SuperheroCard {...defaultProps} onDelete={mockOnDelete} />);

    fireEvent.click(screen.getByText("Delete"));

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(mockSuperhero);
  });

  it("handles superhero without images", () => {
    const heroWithoutImages = { ...mockSuperhero, images: [] };
    render(<SuperheroCard {...defaultProps} superhero={heroWithoutImages} />);
    expect(screen.getByText("Superman")).toBeInTheDocument();
  });
});
