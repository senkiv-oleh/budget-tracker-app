import React, { useState } from "react";
import { BudgetProvider } from "./context/BudgetContext/BudgetContext";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionList } from "./components/TransactionList";
import { BudgetSummary } from "./components/BudgetSummary";
import { Header } from "./components/Header";
import { Transaction } from "./types/Transaction";
import "./App.scss";

export const App: React.FC = () => {
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  return (
    <BudgetProvider>
      <div className="app">
        <header className="app__header">
          <Header />
        </header>
        <main className="app__main">
          <BudgetSummary />
          <TransactionForm
            editingTransaction={editingTransaction}
            setEditingTransaction={setEditingTransaction}
          />
          <TransactionList setEditingTransaction={setEditingTransaction} />
        </main>
      </div>
    </BudgetProvider>
  );
};
