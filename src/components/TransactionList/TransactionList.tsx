import React, { useContext } from "react";
import { BudgetContext } from "../../context/BudgetContext";
import { TransactionItem } from "../TransactionItem";
import "./TransactionList.scss";
import { Transaction } from "../../types/Transaction";

type TransactionListProps = {
  setEditingTransaction: (transaction: Transaction) => void;
};

export const TransactionList: React.FC<TransactionListProps> = ({
  setEditingTransaction,
}) => {
  const context = useContext(BudgetContext);

  if (!context) {
    throw new Error("TransactionList must be used within a BudgetProvider");
  }

  const { state } = context;
  return (
    state.transactions.length !== 0 && (
      <div className="transaction-list">
        {state.transactions.map((transaction: Transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onEdit={setEditingTransaction}
          />
        ))}
      </div>
    )
  );
};
