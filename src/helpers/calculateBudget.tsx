import { useBudgetContext } from '../context/BudgetContext/useBudgetContext';

export const calculateBudget = (type: "income" | "expense"): number => {
  const { state } = useBudgetContext();

  return state.transactions
    .filter((transaction) => transaction.type === type)
    .reduce((accumulator, transaction) => accumulator + transaction.amount, 0);
};
