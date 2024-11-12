[DEMO LINK](https://senkiv-oleh.github.io/budget-tracker-app)

---

# Budget Management App

A React-based budget management application that helps users track and manage their income and expenses. The app includes features like transaction logging, editing, and deletion, with categories for both income and expenses. It is built with a modular and scalable architecture, using React Context and TypeScript for state management and type safety.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)

---

## Project Overview

This Budget Management App enables users to:
- Transaction logging and categorize income and expense transactions.
- View a summary of all transactions.
- Edit and delete transactions to keep budgets accurate.
  
The app is designed with clean, reusable components following BEM and SASS for styling, and React Context API for managing global state without heavy state management libraries.

## Features

- **Add, Edit, and Delete Transactions**: Users can manage their transactions with easy-to-use forms.
- **Income and Expense Categories**: Transactions are categorized for better financial tracking.
- **Real-Time State Management**: Powered by React Context API.
- **Error Handling and Validation**: Ensures input integrity and user-friendly validation messages.

## Tech Stack

- **Frontend**: React, JavaScript
- **State Management**: React Context API
- **Styling**: SASS, BEM methodology
- **Type Safety**: TypeScript (for type definitions and interfaces)

## Usage

- **Adding a Transaction**: Enter transaction details like amount, type (income or expense), category, description, and date.
- **Editing a Transaction**: Click the "Edit" button on an existing transaction to modify its details.
- **Deleting a Transaction**: Click the "Delete" button to remove a transaction.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/budget-management-app.git
    cd budget-management-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3000` to view the app.


## Folder Structure

```
budget-management-app/
├── public/                 # Static files
├── src/
│   ├── components/         # Reusable components (e.g., TransactionForm, TransactionItem)
│   ├── context/            # Context and provider setup for global state (e.g., BudgetContext)
│   ├── types/              # TypeScript interfaces (e.g., Transaction, BudgetContextType)
│   ├── App.js              # Main App component
│   ├── index.js            # Entry point
│   └── styles/             # Global SASS and styling files
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
```
