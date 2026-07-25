document.getElementById("txnForm").addEventListener("submit", addRow);

const incomeBtn = document.getElementById("incomeBtn");
const expenseBtn = document.getElementById("expenseBtn");
const typeError = document.getElementById("typeError");
const table = document.getElementById("transactionTable");
let editingId = null;

function toggleTypeBtn(selected, other) {
  const isSelected = selected.classList.contains("selected");
  selected.classList.toggle("selected", !isSelected);
  other.classList.remove("selected");
  typeError.style.display = "none";
}

incomeBtn.addEventListener("click", () => toggleTypeBtn(incomeBtn, expenseBtn));
expenseBtn.addEventListener("click", () => toggleTypeBtn(expenseBtn, incomeBtn));

function renderRow(txn) {
  const row = table.insertRow();

  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);
  const cell5 = row.insertCell(4);
  const editBtn = document.createElement("button");
  editBtn.textContent = "...";
  editBtn.type = "button";
  editBtn.classList.add('editBtn');

  editBtn.addEventListener("click", () => {
    document.getElementById("payeeInput").value = txn.payee;
    document.getElementById("amtInput").value = txn.amount;
    document.getElementById("catInput").value = txn.category;
    document.getElementById("dateInput").value = txn.date;
    incomeBtn.classList.toggle("selected", txn.type == "income")
    expenseBtn.classList.toggle("selected", txn.type == "expense")
    editingId = txn.id;
  })

  cell1.textContent = txn.date;
  cell2.textContent = txn.payee;
  cell3.textContent = txn.category;
  cell4.textContent = `$${txn.amount.toFixed(2)}`;
  cell4.style.color = txn.type === "income" ? "#3ecf8e" : "#f0546b";
  cell5.appendChild(editBtn);
}

function renderTable(transactions) {
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  transactions.forEach(renderRow);
}

async function loadTransactions() {
  const response = await fetch("/api/transactions");
  const transactions = await response.json();
  renderTable(transactions);
}

async function addRow(event) {
  event.preventDefault();

  if (!incomeBtn.classList.contains("selected") && !expenseBtn.classList.contains("selected")) {
    typeError.style.display = "inline";
    return;
  }

  const payee = document.getElementById("payeeInput").value;
  const amount = document.getElementById("amtInput").value;
  const category = document.getElementById("catInput").value;
  const date = document.getElementById("dateInput").value;
  const type = incomeBtn.classList.contains("selected") ? "income" : "expense";

  let response;
  if (editingId != null) {
    response = await fetch(`/api/transactions/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, payee, category, amount, type }),
    });
    editingId = null;
  } else {
    response = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, payee, category, amount, type }),
    });
  }

  if (!response.ok) {
    const { error } = await response.json();
    alert(`Could not save transaction: ${error}`);
    return;
  }

  await loadTransactions();

  // Clear inputs
  incomeBtn.classList.remove("selected");
  expenseBtn.classList.remove("selected");
  document.getElementById("payeeInput").value = "";
  document.getElementById("amtInput").value = "";
  document.getElementById("catInput").value = "";
  document.getElementById("dateInput").value = "";
}

loadTransactions();
