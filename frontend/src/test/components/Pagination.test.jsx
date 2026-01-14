import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "../../components/Pagination";

describe("Pagination", () => {
  it("renders the current page number", () => {
    render(
      <Pagination currentPage={3} onPageChange={() => {}} hasMore={true} />
    );
    expect(screen.getByText("Page 3")).toBeInTheDocument();
  });

  it("renders Previous and Next buttons", () => {
    render(
      <Pagination currentPage={2} onPageChange={() => {}} hasMore={true} />
    );
    expect(screen.getByText("← Previous")).toBeInTheDocument();
    expect(screen.getByText("Next →")).toBeInTheDocument();
  });

  it("disables Previous button on first page", () => {
    render(
      <Pagination currentPage={1} onPageChange={() => {}} hasMore={true} />
    );
    expect(screen.getByText("← Previous")).toBeDisabled();
  });

  it("enables Previous button when not on first page", () => {
    render(
      <Pagination currentPage={2} onPageChange={() => {}} hasMore={true} />
    );
    expect(screen.getByText("← Previous")).not.toBeDisabled();
  });

  it("disables Next button when hasMore is false", () => {
    render(
      <Pagination currentPage={1} onPageChange={() => {}} hasMore={false} />
    );
    expect(screen.getByText("Next →")).toBeDisabled();
  });

  it("enables Next button when hasMore is true", () => {
    render(
      <Pagination currentPage={1} onPageChange={() => {}} hasMore={true} />
    );
    expect(screen.getByText("Next →")).not.toBeDisabled();
  });

  it("calls onPageChange with previous page when Previous is clicked", () => {
    const mockOnPageChange = vi.fn();
    render(
      <Pagination
        currentPage={3}
        onPageChange={mockOnPageChange}
        hasMore={true}
      />
    );

    fireEvent.click(screen.getByText("← Previous"));

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange with next page when Next is clicked", () => {
    const mockOnPageChange = vi.fn();
    render(
      <Pagination
        currentPage={2}
        onPageChange={mockOnPageChange}
        hasMore={true}
      />
    );

    fireEvent.click(screen.getByText("Next →"));

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });
});
