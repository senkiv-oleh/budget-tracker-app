import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BudgetProvider } from './BudgetContext';
import { useBudgetContext } from './useBudgetContext'

// Тестовий компонент для перевірки контексту
const TestComponent: React.FC = () => {
  const { state, dispatch } = useBudgetContext();

  return (
    <div>
      <button
        onClick={() =>
          dispatch({
            type: 'ADD_TRANSACTION',
            payload: {
              id: '1',
              type: 'income',
              amount: 100,
              category: 'Salary',
              description: 'Test transaction',
              date: '2024-11-21',
            },
          })
        }
      >
        Add Transaction
      </button>
      <ul>
        {state.transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.type} - ${transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

describe('BudgetContext', () => {
  test('should add a transaction to the state', () => {
    render(
      <BudgetProvider>
        <TestComponent />
      </BudgetProvider>
    );

    // Клік по кнопці для додавання транзакції
    fireEvent.click(screen.getByText(/Add Transaction/i));

    // Перевірка, чи транзакція з'явилася в списку
    expect(screen.getByText(/income - \$100/i)).toBeInTheDocument();
  });
});

