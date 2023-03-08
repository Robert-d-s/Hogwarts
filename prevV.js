function generateStudentItem(student) {
  if (!student.imageName) return "";
  return `
          <li>
            <img src="images/${student.imageName}" alt="${student.firstName} ${
    student.lastName
  }">
            <div class="student-info">
              <h2>${student.firstName} ${
    student.middleName ? student.middleName + " " : ""
  }${student.lastName}${
    student.nickName ? ' "' + student.nickName + '"' : ""
  }</h2>
  <p>${student.gender}</p>
  <p>${student.house}</p>
            </div>
          </li>
        `;
}

function generateStudentItem(student) {
  return `
          <li>
            ${
              student.imageName
                ? `<img src="images/${student.imageName}" alt="${student.firstName} ${student.lastName}">`
                : `<div class="no-image">No Image Available</div>`
            }
            <div class="student-info">
              <h2>${student.firstName} ${
    student.middleName ? student.middleName + " " : ""
  }${student.lastName}${
    student.nickName ? ' "' + student.nickName + '"' : ""
  }</h2>
  <p>${student.gender}</p>
  <p>${student.house}</p>
  ${student.bloodStatus ? `<p>Blood Status: ${student.bloodStatus}</p>` : ""}
            </div>
          </li>
        `;
}

function displayStudents(students) {
  // Create table element
  const table = document.createElement("table");

  // Create table headers
  const headers = [
    "Image",
    "First Name",
    "Middle Name",
    "Last Name",
    "House",
    "Prefect",
  ];
  const headerRow = document.createElement("tr");
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Create table rows for each student
  students.forEach((student) => {
    const row = document.createElement("tr");

    // Create table cells for each student property
    const imageCell = document.createElement("td");
    if (student.imageName) {
      const image = document.createElement("img");
      image.src = `images/${student.imageName}`;
      image.alt = `${student.firstName} ${student.lastName}`;
      imageCell.appendChild(image);
    } else {
      imageCell.textContent = "No Image Available";
    }
    row.appendChild(imageCell);

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = student.firstName;
    row.appendChild(firstNameCell);

    const middleNameCell = document.createElement("td");
    middleNameCell.textContent = student.middleName || "";
    row.appendChild(middleNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = student.lastName;
    row.appendChild(lastNameCell);

    const houseCell = document.createElement("td");
    houseCell.textContent = student.house;
    row.appendChild(houseCell);

    const prefectCell = document.createElement("td");
    const prefectButton = document.createElement("button");
    prefectButton.textContent = student.prefect ? "Is Prefect" : "Make Prefect";
    prefectButton.addEventListener("click", () => {
      student.prefect = !student.prefect;
      prefectButton.textContent = student.prefect
        ? "Is Prefect"
        : "Make Prefect";
    });
    prefectCell.appendChild(prefectButton);
    row.appendChild(prefectCell);

    // Append row to table
    table.appendChild(row);
  });

  // Append table to student list container
  const studentList = document.getElementById("student-list");
  studentList.appendChild(table);
}
