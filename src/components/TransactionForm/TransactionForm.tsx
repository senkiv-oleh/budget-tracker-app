// src/components/TransactionForm.js
import React, { useState, useEffect } from "react";
import classNames from 'classnames/dedupe';
import { Transaction } from "../../types/Transaction";
import "./TransactionForm.scss";
import { useBudgetContext } from '../../context/BudgetContext/useBudgetContext';
import categories from './categories.json';

console.log(categories);

interface TransactionFormProps {
  editingTransaction?: Transaction | null;
  setEditingTransaction: (transaction: Transaction | null) => void;
}

interface Errors {
  type?: string;
  amount?: string;
  category?: string;
  description?: string;
  date?: string;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  editingTransaction,
  setEditingTransaction,
}) => {
  const { dispatch } = useBudgetContext();

  const [transaction, setTransaction] = useState<Transaction>({
    id: '',
    type: '',
    amount: 0,
    category: '',
    description: '',
    date: '',
  });
  const [errors, setErrors] = useState<Errors>({});

  const {incomeCategories, expenseCategories} = categories;

  useEffect(() => {
    if (editingTransaction) {
      setTransaction({
        ...editingTransaction,
      })
    }
  }, [editingTransaction]);

  const validate = () => {
    const validationErrors: Errors = {};

    if (!transaction.type) validationErrors.type = "Type is required";
    if (!transaction.amount || transaction.amount <= 0)
      validationErrors.amount = "Amount must be positive";
    if (!transaction.category) validationErrors.category = "Category is required";
    if (!transaction.date) validationErrors.date = "Date is required";

    return validationErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const transactionData = {
      ...transaction,
      id: editingTransaction
        ? String(editingTransaction.id)
        : Date.now().toString(),
    };

    if (editingTransaction) {
      dispatch({
        type: "UPDATE_TRANSACTION",
        payload: transactionData,
      });
      setEditingTransaction(null);
    } else {
      dispatch({
        type: "ADD_TRANSACTION",
        payload: transactionData,
      });
    }

    setTransaction({
      id: '',
      type: '',
      amount: 0,
      category: '',
      description: '',
      date: '',
  })

    setErrors({});
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setTransaction(current => ({ ...current, [name]: value }));
  }

  return (
    <form className="transaction-form__form" onSubmit={handleSubmit}>
      <div className="transaction-form__wrapper">
        <label className="transaction-form__label">Transaction Type</label>
        <select
          className={classNames("transaction-form__select", {
             "transaction-form--denger": errors.type})}
          value={transaction.type}
          name="type"
          onChange={(event) => {
            handleChange(event);
            setTransaction(current => ({ ...current, category: '' }));
          }}
        >
          <option value="">Select Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {errors.type && (
          <div className="transaction-form__error">{errors.type}</div>
        )}
      </div>

      <div className="transaction-form__wrapper">
        <label className="transaction-form__label">Amount</label>
        <input
          type="number"
          min="0.00"
          step="0.01"
          name="amount"
          className={classNames("transaction-form__input", {
             "transaction-form--denger": errors.amount})}
          value={transaction.amount ? transaction.amount : ''}
          onChange={handleChange}
        />
        {errors.amount && (
          <div className="transaction-form__error">{errors.amount}</div>
        )}
      </div>

      <div className="transaction-form__wrapper">
        <label className="transaction-form__label">Category</label>
        <select
          className={classNames("transaction-form__select", {
             "transaction-form--denger": errors.category})}
          name="category"
          value={transaction.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {(transaction.type === "income" ? incomeCategories : expenseCategories).map(
            (cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ),
          )}
        </select>
        {errors.category && (
          <div className="transaction-form__error">{errors.category}</div>
        )}
      </div>

      <div className="transaction-form__wrapper">
        <label className="transaction-form__label">Description</label>
        <textarea
          className="transaction-form__input"
          name="description"
          value={transaction.description}
          onChange={handleChange}
        />
      </div>

      <div className="transaction-form__wrapper">
        <label className="transaction-form__label">Date</label>
        <input
          type="date"
          name="date"
          className={classNames("transaction-form__input", {
             "transaction-form--denger": errors.date})}
          value={transaction.date}
          onChange={handleChange}
        />
        {errors.date && (
          <div className="transaction-form__error">{errors.date}</div>
        )}
      </div>
      <button type="submit" className="transaction-form__button">
        {editingTransaction ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
  );
};
