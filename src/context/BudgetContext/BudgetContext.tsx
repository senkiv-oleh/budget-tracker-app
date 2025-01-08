import
  React, {
    createContext,
    Dispatch,
    ReactNode,
    useEffect,
    useReducer,
    useRef
  } from "react";
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

const saveToLocalStorage = (state: BudgetState) => {
  localStorage.setItem("budgetState", JSON.stringify(state));
};

const loadFromLocalStorage = (): BudgetState => {
  const savedState = localStorage.getItem("budgetState");
  return savedState ? JSON.parse(savedState) : initialState;
};


const budgetReducer = (
  state: BudgetState,
  action: TransactionAction,
): BudgetState => {
  switch (action.type) {
    case "ADD_TRANSACTION": {
      const newStateAdd = {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
      saveToLocalStorage(newStateAdd);
      return newStateAdd;
    }

    case "UPDATE_TRANSACTION": {
      const newStateUpdate = {
        ...state,
        transactions: state.transactions.map((transaction) =>
          transaction.id === action.payload.id ? action.payload : transaction,
        ),
      };
      saveToLocalStorage(newStateUpdate);
      return newStateUpdate;
    }
    case "DELETE_TRANSACTION": {
      const newStateDelete = {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload,
        ),
      };
      saveToLocalStorage(newStateDelete);
      return newStateDelete;
    }

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
  const [state, dispatch] = useReducer(budgetReducer, loadFromLocalStorage());
  const hasStateChanged = useRef(false);

  useEffect(() => {
    if (hasStateChanged.current) {
      saveToLocalStorage(state);
    } else {
      hasStateChanged.current = true;
    }
  }, [state]);

  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
};

