import { Transaction } from "./Transaction";

export interface TransactionFormProps {
  editingTransaction?: Transaction | null;
  setEditingTransaction: (transaction: Transaction | null) => void;
}