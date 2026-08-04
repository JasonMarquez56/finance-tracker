# Finance Tracker

A simple personal finance tracker for logging income and expenses. Add transactions through a form, view them in a table, edit or delete them, and keep everything stored locally in a SQLite database.

## Features

- Add transactions with payee, amount, category, date, and type (income or expense)
- View all transactions in a sortable table (newest first)
- Edit existing transactions
- Select and delete one or more transactions at once
- Data persists locally in a SQLite file, no external services needed

## Tech Stack

- Node.js and Express for the backend API
- better-sqlite3 for local data storage
- Vanilla HTML, CSS, and JavaScript on the frontend

## Getting Started

### Prerequisites

You need Node.js installed on your machine.

### Installation

Clone the repo and install dependencies:

```
git clone https://github.com/JasonMarquez56/finance-tracker.git
cd finance-tracker
npm install
```

### Running the app

```
npm start
```

The server starts on port 8080 by default. Open your browser to:

```
http://localhost:8080
```

You can change the port by setting the PORT environment variable.

## API

The server exposes a small REST API used by the frontend:

- `GET /api/transactions` returns all transactions
- `POST /api/transactions` creates a transaction
- `PUT /api/transactions/:id` updates a transaction
- `DELETE /api/transactions/:id` deletes a transaction

Each transaction has these fields: `date`, `payee`, `category`, `amount`, and `type` (either `income` or `expense`).

## Data storage

Transactions are stored in a local `finance.db` SQLite file created automatically the first time the server runs. There's nothing to configure, it just works out of the box.

## Notes

This is a small side project built for personal use, so it doesn't include authentication or multi user support. If you're running it for yourself, that's all it needs.
