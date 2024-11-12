import React from "react";
import { TransactionItem } from "../TransactionItem";
import "./TransactionList.scss";
import { Transaction } from "../../types/Transaction";
import { useBudgetContext } from '../../context/BudgetContext/useBudgetContext'

type TransactionListProps = {
  setEditingTransaction: (transaction: Transaction | null) => void;
};

export const TransactionList: React.FC<TransactionListProps> = ({
  setEditingTransaction,
}) => {
  const { state } = useBudgetContext();

   if (state.transactions.length === 0) {
    return null;
  }
  
  return (
    <div className="transaction-list">
      {state.transactions.map((transaction: Transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onEdit={setEditingTransaction}
        />
      ))}
    </div>
  );
};
