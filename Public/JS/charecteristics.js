function addCharacteristicsRow() {
  var table = document
    .getElementById("roomTable")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.rows.length);

  // Create grid columns for each cell
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);

  // Add a custom class to the grid columns
  cell1.className = "custom-col";
  cell2.className = "custom-col";
  cell3.className = "custom-col";

  // Insert form controls inside the grid columns
  cell1.innerHTML =
    '<input type="text" class="form-control" placeholder="Characteristic">';
  cell2.innerHTML =
    '<input type="text" class="form-control" style="font-size: large;" placeholder="Icon">';
  cell3.innerHTML =
    '<div class="btn-group d-flex justify-content-center"" role="group">' +
    '<button class="btn btn-primary" style="margin-right: 10px;" onclick="toggleReadOnly(this)">Edit</button>' +
    '<button class="btn btn-danger" onclick="deleteCharacteristicRow(this)">Delete</button>' +
    "</div>";

  document.getElementById("saveButtonContainer").style.cssText =
    "display: block; margin-right: 70px;";
}

function saveCharacteristicRow() {
  var table = document
    .getElementById("roomTable")
    .getElementsByTagName("tbody")[0];
  var lastRow = table.rows[table.rows.length - 1];

  var characteristic = lastRow.cells[0].querySelector("input").value;
  var iconInput = lastRow.cells[1].querySelector("input");
  var icon = "";

  if (iconInput) {
    icon = iconInput.value;
  } else {
    // If the icon input is not found, it might have been dynamically created during editing
    var iconElement = lastRow.cells[1].querySelector("i");
    if (iconElement) {
      // Extract the icon class from the dynamically created <i> element
      var iconClasses = iconElement.className.split(" ");
      icon = iconClasses.find((cls) => cls.startsWith("fa-")).substring(3);
    }
  }

  if (characteristic && icon) {
    document.getElementById("errorMessage").innerHTML = "";
    var form = document.createElement('form');
    form.style.visibility = 'hidden';
    form.method = 'post';
    form.action = '/admin/addCharacteristic';
    var input1 = document.createElement('input');
    input1.type = 'hidden';
    input1.name = 'characteristic';
    input1.value = characteristic; 
    form.appendChild(input1);
    var input2 = document.createElement('input');
    input2.type = 'hidden';
    input2.name = 'icon';
    input2.value = "fa-solid fa-" + icon;
    form.appendChild(input2);
    document.body.appendChild(form);
    form.submit();
  } else {
    document.getElementById("errorMessage").innerHTML =
      "Please fill in all fields before saving.";
  }
}

function deleteCharacteristicRow(button) {
  var row = button.closest("tr");
  row.parentNode.removeChild(row);
}

function toggleReadOnly(button) {
  var row = button.closest("tr");
  var cells = row.cells;

  for (var i = 0; i < cells.length - 2; i++) {
    var input = cells[i].querySelector("input");
    input.readOnly = !input.readOnly;
  }
}

function makeFieldsReadOnly(cells) {
  for (var i = 0; i < cells.length - 1; i++) {
    var input = cells[i].querySelector("input");
    input.readOnly = true;
  }
}

function toggleReadOnly(button) {
  var row = button.closest("tr");
  var cells = row.cells;

  for (var i = 0; i < cells.length - 2; i++) {
    var input = cells[i].querySelector("input");

    if (input) {
      input.readOnly = !input.readOnly;
      console.log(
        "Input field " + (i + 1) + " is now read-only: " + input.readOnly
      );
    } else {
      console.log("No input field found in cell " + (i + 1));
    }
  }

  // Toggle the read-only state for the icon input field
  var iconCell = cells[1];
  var iconInput = iconCell.querySelector("input");
  if (iconInput) {
    iconInput.readOnly = !iconInput.readOnly;
    console.log("Icon field is now read-only: " + iconInput.readOnly);
  } else {
    // If no icon input field found, create one
    var iconInput = document.createElement("input");
    iconInput.type = "text";
    iconInput.className = "form-control";
    iconInput.style = "font-size: large;";
    iconInput.placeholder = "Icon";
    iconCell.innerHTML = "";
    iconCell.appendChild(iconInput);
  }

  // Show the "Save" button container when fields are editable
  var saveButtonContainer = document.getElementById("saveButtonContainer");
  saveButtonContainer.style.display = Array.from(cells).some((cell) => {
    var input = cell.querySelector("input");
    return input && !input.readOnly;
  })
    ? "block"
    : "none";
}
