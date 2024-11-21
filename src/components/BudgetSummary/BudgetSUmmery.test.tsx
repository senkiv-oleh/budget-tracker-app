import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BudgetSummary } from './BudgetSummary';
import { calculateBudget } from '../../helpers/calculateBudget';

jest.mock('../../helpers/calculateBudget');

describe('BudgetSummary', () => {
  it('should display total income, expenses, and balance', () => {
    (calculateBudget as jest.Mock).mockImplementation((type: string) => {
      if (type === 'income') return 100;
      if (type === 'expense') return 40;
      return 0;
    });

    render(<BudgetSummary />);

    expect(screen.getByText(/Total Income/i)).toBeInTheDocument();
    expect(screen.getByText(/\$ 100/i)).toBeInTheDocument();

    expect(screen.getByText(/Total Expenses/i)).toBeInTheDocument();
    expect(screen.getByText(/\$ 40/i)).toBeInTheDocument();

    expect(screen.getByText(/Balance/i)).toBeInTheDocument();
    expect(screen.getByText(/\$ 60/i)).toBeInTheDocument();
  });

  it('should display negative balance in red when expenses are greater than income', () => {
    (calculateBudget as jest.Mock).mockImplementation((type: string) => {
      if (type === 'income') return 50;
      if (type === 'expense') return 100;
      return 0;
    });

    render(<BudgetSummary />);

    const balanceElement = screen.getByText(/\$ -50/i);
    expect(balanceElement).toBeInTheDocument();
    expect(balanceElement).toHaveClass('budget-summary__value--danger');
  });

  it('should display positive balance in green when income is greater than expenses', () => {
    (calculateBudget as jest.Mock).mockImplementation((type: string) => {
      if (type === 'income') return 200;
      if (type === 'expense') return 150;
      return 0;
    });

    render(<BudgetSummary />);

    const balanceElement = screen.getByText(/\$ 50/i);
    expect(balanceElement).toBeInTheDocument();
    expect(balanceElement).toHaveClass('budget-summary__value--success');
  });
});
