import { Transaction } from "./Transaction";

export type TransactionAction =
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | { type: "UPDATE_TRANSACTION"; payload: Transaction }
  | { type: "DELETE_TRANSACTION"; payload: string };
