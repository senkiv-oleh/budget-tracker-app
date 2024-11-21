import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TransactionList } from './TransactionList';
import { BudgetContext } from '../../context/BudgetContext';
import { Transaction } from '../../types/Transaction';

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 100,
    category: 'Salary',
    description: 'Test transaction',
    date: '2024-11-21',
  },
  {
    id: '2',
    type: 'expense',
    amount: 50,
    category: 'Groceries',
    description: 'Test expense',
    date: '2024-11-20',
  },
];

const MockBudgetProvider = ({ children }: { children: React.ReactNode }) => (
  <BudgetContext.Provider value={{ state: { transactions: mockTransactions }, dispatch: jest.fn() }}>
    {children}
  </BudgetContext.Provider>
);

describe('TransactionList', () => {
  test('should render the transaction list with correct data', () => {
    render(
      <MockBudgetProvider>
        <TransactionList setEditingTransaction={jest.fn()} />
      </MockBudgetProvider>
    );

    expect(screen.getByText(/Salary/i)).toBeInTheDocument();
    expect(screen.getByText(/Groceries/i)).toBeInTheDocument();
  });

  test('should call setEditingTransaction on edit button click', () => {
    const setEditingTransaction = jest.fn();

    render(
      <MockBudgetProvider>
        <TransactionList setEditingTransaction={setEditingTransaction} />
      </MockBudgetProvider>
    );

    const editButton = screen.getAllByText(/Edit/i)[0];

    fireEvent.click(editButton);

    expect(setEditingTransaction).toHaveBeenCalledWith(mockTransactions[0]);
  });

  test('should not render any transaction when no transactions exist', () => {
    const emptyTransactions: Transaction[] = [];

    const EmptyMockBudgetProvider = ({ children }: { children: React.ReactNode }) => (
      <BudgetContext.Provider value={{ state: { transactions: emptyTransactions }, dispatch: jest.fn() }}>
        {children}
      </BudgetContext.Provider>
    );

    render(
      <EmptyMockBudgetProvider>
        <TransactionList setEditingTransaction={jest.fn()} />
      </EmptyMockBudgetProvider>
    );

    expect(screen.queryByText(/Salary/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Groceries/i)).not.toBeInTheDocument();
  });
});
