import React, { createContext, Dispatch, ReactNode, useReducer } from "react";
import { Transaction } from "../../types/Transaction";
import { TransactionAction } from "../../types/TransactionAction";

type BudgetState = {
  transactions: Transaction[];
};

type BudgetContextType = {
  state: BudgetState;
  dispatch: Dispatch<TransactionAction>;
};

const initialState = {
  transactions: [],
};

const budgetReducer = (
  state: BudgetState,
  action: TransactionAction,
): BudgetState => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case "UPDATE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((transaction) =>
          transaction.id === action.payload.id ? action.payload : transaction,
        ),
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload,
        ),
      };

    default:
      return state;
  }
};

export const BudgetContext = createContext<BudgetContextType | undefined>(
  undefined,
);

type BudgetProviderProps = {
  children: ReactNode;
};

export const BudgetProvider: React.FC<BudgetProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
};
