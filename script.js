document.getElementById("txnForm").addEventListener("submit", addRow);

function addRow(event){
  event.preventDefault()
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

  // Clear inputs
  document.getElementById("descInput").value = '';
  document.getElementById("amtInput").value = '';
  document.getElementById("catInput").value = '';
  document.getElementById("dateInput").value = '';
}