import React from "react";
import "./TransactionItem.scss";
import { Transaction } from "../../types/Transaction";
import { useBudgetContext } from '../../context/BudgetContext/useBudgetContext'

interface TransactionItemProps {
  transaction: Transaction; 
  onEdit: (transaction: Transaction) => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onEdit,
}) => {
  const { dispatch } = useBudgetContext(); 

  const handleDelete = () => {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: transaction.id,
    });
  };

  return (
    <div className={`transaction-item transaction-item--${transaction.type}`}>
      <div className="transaction-item__details">
        <h4 className="transaction-item__title">{transaction.description}</h4>
        <p className="transaction-item__category">{transaction.category}</p>
        <p className="transaction-item__date">
          {new Date(transaction.date).toLocaleDateString()}
        </p>
      </div>
      <div className="transaction-item__amount">
        <span>
          {transaction.type === "expense" ? "-" : "+"} ${transaction.amount}
        </span>
        <button
          className="transaction-item__delete-button"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="transaction-item__edit-button"
          onClick={() => onEdit(transaction)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};
