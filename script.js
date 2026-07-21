document.getElementById("txnForm").addEventListener("submit", addRow);

const incomeBtn = document.getElementById("incomeBtn");
const expenseBtn = document.getElementById("expenseBtn");
const typeError = document.getElementById("typeError");

function toggleTypeBtn(selected, other) {
  const isSelected = selected.classList.contains("selected");
  selected.classList.toggle("selected", !isSelected);
  other.classList.remove("selected");
  typeError.style.display = "none";
}

incomeBtn.addEventListener("click", () => toggleTypeBtn(incomeBtn, expenseBtn));
expenseBtn.addEventListener("click", () => toggleTypeBtn(expenseBtn, incomeBtn));

function addRow(event){
  event.preventDefault()

  if (!incomeBtn.classList.contains("selected") && !expenseBtn.classList.contains("selected")) {
    typeError.style.display = "inline";
    return;
  }

  const description = document.getElementById("descInput").value;
  const amount = document.getElementById("amtInput").value;
  const category = document.getElementById("catInput").value;
  const date = document.getElementById("dateInput").value;

  const table = document.getElementById("transactionTable");
  const row = table.insertRow();

  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);
  cell1.textContent = date;
  cell2.textContent = description;
  cell3.textContent = category;
  cell4.textContent = `$${parseFloat(amount).toFixed(2)}`;
  cell4.style.color = incomeBtn.classList.contains('selected') ? 'green':'red';

  // Clear inputs
  incomeBtn.classList.remove("selected");
  expenseBtn.classList.remove("selected");
  document.getElementById("descInput").value = '';
  document.getElementById("amtInput").value = '';
  document.getElementById("catInput").value = '';
  document.getElementById("dateInput").value = '';
}