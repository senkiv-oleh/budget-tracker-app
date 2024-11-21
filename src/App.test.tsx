import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { App } from "./App";

jest.mock("./context/BudgetContext/useBudgetContext");

describe("App Component", () => {
  test("should add a transaction when form is submitted", async () => {
    const mockTransactions = [
      { id: '1', type: 'income', amount: 100, category: 'Salary', description: 'Salary for November', date: '2024-11-01' },
    ];

    jest.spyOn(require('./context/BudgetContext/useBudgetContext'), 'useBudgetContext').mockReturnValue({
      state: { transactions: mockTransactions },
      dispatch: jest.fn(),
    });

    render(<App />);

    const descriptionInput = screen.getByLabelText("Description");

    const addButton = screen.getByText("Add Transaction");

    fireEvent.change(descriptionInput, { target: { value: "Salary for November" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("Salary for November")).toBeInTheDocument();
    });
  });
});
