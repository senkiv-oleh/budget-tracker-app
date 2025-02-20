import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useBudgetContext } from '../../context/BudgetContext/useBudgetContext';
import { Transaction } from '../../types/Transaction';
import { TransactionFormProps } from '../../types/TransactionFormProps';
import categories from './categories.json';
import "./TransactionForm.scss";

type DefaultValues = Omit<Transaction, "id">;

const defaultValues: DefaultValues = {
  type: '',
  amount: 0,
  category: '',
  description: '',
  date: '',
};

export const TransactionForm: React.FC<TransactionFormProps> = ({
  editingTransaction,
  setEditingTransaction,
}) => {
  const { dispatch } = useBudgetContext();
  const { incomeCategories, expenseCategories } = categories;
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<Transaction>( {defaultValues});

  useEffect(() => {
    if (editingTransaction) {
      reset(editingTransaction);
    }
  }, [editingTransaction, reset]);

  const onSubmit = (data: Transaction) => {
    const transactionData = {
      ...data,
      id: editingTransaction ? editingTransaction.id : Date.now().toString(),
    };

    if (editingTransaction) {
      dispatch({ type: "UPDATE_TRANSACTION", payload: transactionData });
      setEditingTransaction(null);
    } else {
      dispatch({ type: "ADD_TRANSACTION", payload: transactionData });
    }

     reset(defaultValues);
  };

  return (
    <form  className="transaction-form__form" onSubmit={handleSubmit(onSubmit)}>
      <div className="transaction-form__wrapper">        <label htmlFor="type" className="transaction-form__label">Transaction Type</label>
        <select
          id="type"
          className={classNames(
            "transaction-form__select",
            {"transaction-form--denger": errors.type}
          )}
          {...register(
            "type",
            { required: "Type is required" }
          )}
        >
          <option value="">Select Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {errors.type && <p className="transaction-form__error">{errors.type.message}</p>}
      </div>

  <div className="transaction-form__wrapper">
        <label htmlFor="amount" className="transaction-form__label">Amount</label>
        <input
          id="amount"
          type="number"
          step="0.01"
           className={classNames("transaction-form__input", {
             "transaction-form--denger": errors.amount})}
          {...register("amount", {
            required: "Amount is required",
            valueAsNumber: true,
            min: { value: 0.01, message: "Amount must be positive" },
          })}
        />
        {errors.amount && <p className="transaction-form__error">{errors.amount.message}</p>}
      </div>

      <div className="transaction-form__wrapper">
        <label htmlFor="category" className="transaction-form__label">Category</label>
        <select
        id="category"
        className={classNames("transaction-form__select", {
             "transaction-form--denger": errors.category})} {...register("category", { required: "Category is required" })}>
          <option value="">Select Category</option>
          {(watch("type") === "income" ? incomeCategories : expenseCategories).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && <p className="transaction-form__error">{errors.category.message}</p>}
      </div>

      <div className="transaction-form__wrapper">
        <label htmlFor="description" className="transaction-form__label">Description</label>
        <textarea
          id="description"
          className="transaction-form__input"
          {...register("description")}
        />
      </div>

       <div className="transaction-form__wrapper">
          
        <label htmlFor="date" className="transaction-form__label">Date</label>
        <input
          type="date"
          id="date"
          className={classNames("transaction-form__input", {
             "transaction-form--denger": errors.date})}
          {...register("date", { required: "Date is required" })}
        />
        {errors.date && <p className="transaction-form__error">{errors.date.message}</p>}
      </div>

      <button type="submit" className="transaction-form__button">
        {editingTransaction ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
  );
};
