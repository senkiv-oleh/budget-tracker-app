import { useContext } from "react";
import { BudgetContext } from "./BudgetContext";

export const useBudgetContext = () => {
  const context = useContext(BudgetContext);

  if (!context) {
    throw new Error("useBudgetContext must be used within a BudgetProvider");
  }

  return context;
};
