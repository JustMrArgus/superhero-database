import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "../../components/Modal";

describe("Modal", () => {
  it("returns null when isOpen is false", () => {
    const { container } = render(
      <Modal isOpen={false} onClose={() => {}} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="My Title">
        <div>Content</div>
      </Modal>
    );
    expect(screen.getByText("My Title")).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test">
        <p>Test paragraph</p>
        <button>Test button</button>
      </Modal>
    );
    expect(screen.getByText("Test paragraph")).toBeInTheDocument();
    expect(screen.getByText("Test button")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const mockOnClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Content</div>
      </Modal>
    );

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when backdrop is clicked", () => {
    const mockOnClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Content</div>
      </Modal>
    );

    const backdrop = screen.getByText("Test Modal").closest(".fixed");
    fireEvent.click(backdrop);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when modal content is clicked", () => {
    const mockOnClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Content</div>
      </Modal>
    );

    fireEvent.click(screen.getByText("Content"));

    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
