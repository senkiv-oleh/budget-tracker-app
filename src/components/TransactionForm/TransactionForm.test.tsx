import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TransactionForm } from './TransactionForm';
import { BudgetContext } from '../../context/BudgetContext';

const mockDispatch = jest.fn();

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BudgetContext.Provider value={{ dispatch: mockDispatch, state: { transactions: [] } }}>
    {children}
  </BudgetContext.Provider>
);

describe('TransactionForm', () => {
  test('should submit form successfully', async () => {
    render(
      <Wrapper>
        <TransactionForm setEditingTransaction={jest.fn()} />
      </Wrapper>
    );

    fireEvent.change(screen.getByLabelText(/Transaction Type/i), { target: { value: 'income' } });
    fireEvent.change(screen.getByLabelText(/Amount/i), { target: { value: 100 } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Salary' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test description' } });
    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2024-11-21' } });

    fireEvent.click(screen.getByText(/Add Transaction/i));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'ADD_TRANSACTION',
          payload: expect.objectContaining({
            type: 'income',
            amount: 100,
            category: 'Salary',
            description: 'Test description',
            date: '2024-11-21',
          }),
        })
      );
    });
  });

  test('should show validation errors for empty fields', async () => {
    render(
      <Wrapper>
        <TransactionForm setEditingTransaction={jest.fn()} />
      </Wrapper>
    );

    fireEvent.click(screen.getByText(/Add Transaction/i));

    await waitFor(() => {
      expect(screen.getByText(/Type is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Amount must be positive/i)).toBeInTheDocument();
      expect(screen.getByText(/Category is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Date is required/i)).toBeInTheDocument();
    });
  });
});
