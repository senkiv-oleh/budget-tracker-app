import React from "react";
import "./BudgetSummary.scss";
import { useBudgetContext } from '../../context/BudgetContext/useBudgetContext'
import { Transaction } from "../../types/Transaction";

export const BudgetSummary: React.FC = () => {
  const { state } = useBudgetContext();

  const income = state.transactions
    .filter((t: Transaction) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  const expenses = state.transactions
    .filter((t: Transaction) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);
  const balance = +income - +expenses;

  return (
    <div className="budget-summary">
      <div className="budget-summary__item">
        <h3 className="budget-summary__title">Total Income</h3>
        <p className="budget-summary__value budget-summary__value--success">
          $ {income}
        </p>
      </div>
      <div className="budget-summary__item">
        <h3 className="budget-summary__title">Total Expenses</h3>
        <p className="budget-summary__value budget-summary__value--danger">
          $ {expenses}
        </p>
      </div>
      <div className="budget-summary__item">
        <h3 className="budget-summary__title">Balance</h3>
        <p
          className={`budget-summary__value ${balance >= 0 ? "budget-summary__value--success" : "budget-summary__value--danger"}`}
        >
          $ {balance}
        </p>
      </div>
    </div>
  );
};
