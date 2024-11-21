import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TransactionItem } from "./TransactionItem";
import { useBudgetContext } from "../../context/BudgetContext/useBudgetContext";

// Mock the useBudgetContext hook
jest.mock("../../context/BudgetContext/useBudgetContext");

describe("TransactionItem Component", () => {
  const mockTransaction = {
    id: "1",
    type: "income",
    amount: 100,
    category: "Salary",
    description: "Salary for November",
    date: "2024-11-01",
  };

  const mockOnEdit = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    // Mock the dispatch function
    (useBudgetContext as jest.Mock).mockReturnValue({
      dispatch: mockDispatch,
    });
  });

  test("should render transaction details", () => {
    render(
      <TransactionItem transaction={mockTransaction} onEdit={mockOnEdit} />
    );

    expect(screen.getByText("Salary for November")).toBeInTheDocument();
    expect(screen.getByText("Salary")).toBeInTheDocument();
    expect(screen.getByText("01.11.2024")).toBeInTheDocument();
    expect(screen.getByText("+ $100")).toBeInTheDocument();
  });

  test("should call dispatch with DELETE_TRANSACTION when delete button is clicked", () => {
    render(
      <TransactionItem transaction={mockTransaction} onEdit={mockOnEdit} />
    );

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "DELETE_TRANSACTION",
      payload: mockTransaction.id,
    });
  });

  test("should call onEdit with transaction when edit button is clicked", () => {
    render(
      <TransactionItem transaction={mockTransaction} onEdit={mockOnEdit} />
    );

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockTransaction);
  });
});
