import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ConfirmDialog } from "../../components/ConfirmDialog";

describe("ConfirmDialog", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onConfirm: vi.fn(),
    title: "Confirm Delete",
    message: "Are you sure you want to delete this item?",
    loading: false,
  };

  it("returns null when isOpen is false", () => {
    const { container } = render(
      <ConfirmDialog {...defaultProps} isOpen={false} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders when isOpen is true", () => {
    render(<ConfirmDialog {...defaultProps} />);
    expect(screen.getByText("Confirm Delete")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<ConfirmDialog {...defaultProps} title="Delete Hero" />);
    expect(screen.getByText("Delete Hero")).toBeInTheDocument();
  });

  it("renders the message", () => {
    render(
      <ConfirmDialog
        {...defaultProps}
        message="This action cannot be undone."
      />
    );
    expect(
      screen.getByText("This action cannot be undone.")
    ).toBeInTheDocument();
  });

  it("renders Cancel and Delete buttons", () => {
    render(<ConfirmDialog {...defaultProps} />);
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("calls onClose when Cancel button is clicked", () => {
    const mockOnClose = vi.fn();
    render(<ConfirmDialog {...defaultProps} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText("Cancel"));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onConfirm when Delete button is clicked", () => {
    const mockOnConfirm = vi.fn();
    render(<ConfirmDialog {...defaultProps} onConfirm={mockOnConfirm} />);

    fireEvent.click(screen.getByText("Delete"));

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it("shows 'Deleting...' when loading is true", () => {
    render(<ConfirmDialog {...defaultProps} loading={true} />);
    expect(screen.getByText("Deleting...")).toBeInTheDocument();
  });

  it("disables buttons when loading is true", () => {
    render(<ConfirmDialog {...defaultProps} loading={true} />);
    expect(screen.getByText("Cancel")).toBeDisabled();
    expect(screen.getByText("Deleting...")).toBeDisabled();
  });

  it("calls onClose when backdrop is clicked", () => {
    const mockOnClose = vi.fn();
    render(<ConfirmDialog {...defaultProps} onClose={mockOnClose} />);

    const backdrop = screen.getByText("Confirm Delete").closest(".fixed");
    fireEvent.click(backdrop);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
