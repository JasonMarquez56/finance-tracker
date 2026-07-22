const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const db = new Database("finance.db");

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- unique row id, SQLite assigns automatically
    date TEXT NOT NULL,                   -- stored as 'YYYY-MM-DD' text (SQLite has no native date type)
    payee TEXT NOT NULL,                  -- who you paid / who paid you
    category TEXT NOT NULL,               -- e.g. Groceries, Entertainment
    amount REAL NOT NULL,                 -- REAL = floating point number
    type TEXT NOT NULL CHECK (type IN ('income', 'expense')) -- CHECK enforces only these two values at the DB level
  )
`);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
app.get("/api/transactions", (req, res) => {
  const rows = db.prepare("SELECT * FROM transactions ORDER BY date DESC, id DESC").all();
  res.json(rows);
});

app.post("/api/transactions", (req, res) => {
  const { date, payee, category, amount, type } = req.body;

  if (!date || !payee || !category || !type) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (type !== "income" && type !== "expense") {
    return res.status(400).json({ error: "type must be 'income' or 'expense'" });
  }
  const parsedAmount = Number(amount);
  if (!Number.isFinite(parsedAmount) || parsedAmount < 0) {
    return res.status(400).json({ error: "amount must be a non-negative number" });
  }

  const result = db
    .prepare(
      "INSERT INTO transactions (date, payee, category, amount, type) VALUES (?, ?, ?, ?, ?)"
    )
    .run(date, payee, category, parsedAmount, type);
  const row = db.prepare("SELECT * FROM transactions WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json(row);
});

app.delete("/api/transactions/:id", (req, res) => {
  const result = db.prepare("DELETE FROM transactions WHERE id = ?").run(req.params.id);
  if (result.changes === 0) {
    return res.status(404).json({ error: "Transaction not found" });
  }
  res.status(204).end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Finance tracker server running at http://localhost:${PORT}`);
});
