// src/components/TransactionForm.js
import React, { useState, useEffect } from "react";
import { Transaction } from "../../types/Transaction";
import "./TransactionForm.scss";
import { useBudgetContext } from '../../context/BudgetContext/useBudgetContext'

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

  const [type, setType] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});

  const incomeCategories = [
    "Salary",
    "Freelance",
    "Investments",
    "Rental Income",
    "Other",
  ];
  const expenseCategories = [
    "Groceries",
    "Rent",
    "Utilities",
    "Entertainment",
    "Transportation",
    "Healthcare",
    "Education",
    "Other",
  ];

  useEffect(() => {
    if (editingTransaction) {
      setType(editingTransaction.type);
      setAmount(editingTransaction.amount.toString());
      setCategory(editingTransaction.category);
      setDescription(editingTransaction.description);
      setDate(editingTransaction.date);
    }
  }, [editingTransaction]);

  const validate = () => {
    const validationErrors: Errors = {};
    if (!type) validationErrors.type = "Type is required";
    if (!amount || parseFloat(amount) <= 0)
      validationErrors.amount = "Amount must be positive";
    if (!category) validationErrors.category = "Category is required";
    if (!description) validationErrors.description = "Description is required";
    if (!date) validationErrors.date = "Date is required";
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
      id: editingTransaction
        ? String(editingTransaction.id)
        : Date.now().toString(),
      type,
      amount: parseFloat(amount),
      category,
      description,
      date,
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

    setType("");
    setAmount("");
    setCategory("");
    setDescription("");
    setDate("");
    setErrors({});
  };

  return (
    <form className="transaction-form__form" onSubmit={handleSubmit}>
      <div className="transaction-form__wrapper">
        <label className="transaction-form__label">Transaction Type</label>
        <select
          className={`transaction-form__select ${
            errors.type && "transaction-form--denger"
          }`}
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setCategory("");
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
          className={`transaction-form__input ${
            errors.amount && "transaction-form--denger"
          }`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {errors.amount && (
          <div className="transaction-form__error">{errors.amount}</div>
        )}
      </div>

      <div className="transaction-form__wrapper">
        <label className="transaction-form__label">Category</label>
        <select
          className={`transaction-form__select ${
            errors.amount && "transaction-form--denger"
          }`}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {(type === "income" ? incomeCategories : expenseCategories).map(
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
          className={`transaction-form__textarea ${
            errors.amount && "transaction-form--denger"
          }`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && (
          <div className="transaction-form__error">{errors.description}</div>
        )}
      </div>

      <div className="transaction-form__wrapper">
        <label className="transaction-form__label">Date</label>
        <input
          type="date"
          className={`transaction-form__input ${
            errors.amount && "transaction-form--denger"
          }`}
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
