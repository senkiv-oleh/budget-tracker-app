import React from "react";
import "./BudgetSummary.scss";
import { calculateBudget } from "../../helpers/calculateBudget";

export const BudgetSummary: React.FC = () => {
  const income = calculateBudget("income");
  const expenses = calculateBudget("expense");
  const balance = +(income - expenses).toFixed(2);

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
