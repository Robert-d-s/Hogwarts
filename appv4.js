// Define the student object
const Student = ({
  firstName,
  middleName = null,
  lastName,
  nickName = null,
  imageName,
  house,
  gender,
  bloodStatus = null,
}) => ({
  firstName,
  middleName,
  lastName,
  nickName,
  imageName,
  house,
  gender,
  bloodStatus,
});

// Read the JSON data
Promise.all([
  fetch("https://petlatkea.dk/2021/hogwarts/students.json").then((response) =>
    response.json()
  ),
  fetch("https://petlatkea.dk/2021/hogwarts/families.json").then((response) =>
    response.json()
  ),
])
  .then((data) => {
    const students = processStudentData(data[0], data[1]);
    displayStudents(students);
  })
  .catch((error) => console.error(error));

function processStudentData(studentsData, bloodData) {
  const students = [];

  // Loop through each student object in the JSON data
  studentsData.forEach((studentData) => {
    // Split the full name into parts
    const fullName = studentData.fullname.trim();
    const nameParts = fullName.split(/\s+/);

    // Capitalize the name parts correctly
    const firstName = capitalizeName(nameParts[0]);
    let middleName = null;
    let lastName = null;
    let nickName = null;

    if (nameParts.length === 3) {
      if (nameParts[1].startsWith('"') && nameParts[1].endsWith('"')) {
        nickName = capitalizeName(nameParts[1].slice(1, -1));
      } else {
        middleName = capitalizeName(nameParts[1]);
      }
      lastName = capitalizeName(nameParts[2]);
    } else {
      lastName = capitalizeName(nameParts[1]);
    }

    // Extract image filename from student name
    const imageName = getImageName(fullName);

    // Capitalize the house name
    const house = capitalizeName(studentData.house.trim());

    // Extract gender from name
    const gender = capitalizeName(studentData.gender);

    // Find the student's blood status by last name
    const bloodStatusData = bloodData;
    const bloodStatus = capitalizeName(
      bloodStatusData.half.includes(lastName)
        ? "half"
        : bloodStatusData.pure.includes(lastName)
        ? "pure"
        : null
    );

    // Create a new Student object with the cleaned data
    const student = Student({
      firstName,
      middleName,
      lastName,
      nickName,
      imageName,
      house,
      gender,
      bloodStatus,
    });

    // Add the new Student object to the array of students
    students.push(student);
  });
  console.table(students);
  return students;
}

// function displayStudents(students) {
//   // Generate HTML markup for each student object
//   const studentItems = students.map(generateStudentItem);

//   // Append the HTML markup to the student list container
//   const studentList = document.getElementById("student-list");
//   studentList.innerHTML = studentItems.join("");
// }

function displayStudents(students) {
  // Create table element
  const table = document.createElement("table");

  // Create table headers
  const headers = ["Image", "First Name", "Middle Name", "Last Name", "House"];
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

    // Append row to table
    table.appendChild(row);
  });

  // Append table to student list container
  const studentList = document.getElementById("student-list");
  studentList.appendChild(table);
}

function generateStudentItem(student) {
  const nameParts = [];

  // Add first name
  nameParts.push(student.firstName);

  // Add middle name (if present)
  if (student.middleName) {
    nameParts.push(student.middleName);
  }

  // Add last name (if present)
  if (student.lastName) {
    nameParts.push(student.lastName);
  }

  // Add nickname (if present)
  if (student.nickName) {
    nameParts.push(`"${student.nickName}"`);
  }

  // Join the name parts together into a single string
  const fullName = nameParts.join(" ");

  // Generate HTML markup for the student object
  return `
    <li>
      ${
        student.imageName
          ? `<img src="images/${student.imageName}" alt="${fullName}">`
          : `<div class="no-image">No Image Available</div>`
      }
      <div class="student-info">
        <h2>${fullName}</h2>
        <p>${student.gender}</p>
        <p>${student.house}</p>
        <p>${student.bloodStatus ? student.bloodStatus : "Muggle"}</p>
      </div>
    </li>
  `;
}

// Helper function to capitalize a name
function capitalizeName(name) {
  if (!name) return null;

  const hyphenIndex = name.indexOf("-");

  if (hyphenIndex !== -1) {
    let capitalized = "";
    const parts = name.split("-");
    for (let i = 0; i < parts.length; i++) {
      capitalized += capitalizeName(parts[i]);
    }
    return capitalized;
  }

  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

// Helper function to extract image filename from student name
function getImageName(fullName) {
  const nameParts = fullName.split(/\s+/);

  let firstName, lastName;
  if (nameParts.length === 1) {
    lastName = nameParts[0];
  } else if (nameParts.length === 2) {
    [firstName, lastName] = nameParts;
  } else if (nameParts.length >= 3) {
    firstName = nameParts[0];
    lastName = nameParts[nameParts.length - 1];
  }

  if (firstName && lastName) {
    let baseName;
    if (lastName === "Finch-Fletchley") {
      baseName = `${lastName.toLowerCase().replace("finch-", "")}_${firstName
        .toLowerCase()
        .charAt(0)}`;
      return `${baseName}.png`;
    } else if (
      lastName === "Patil" &&
      (firstName === "Padma" || firstName === "Parvati")
    ) {
      baseName = `${lastName.toLowerCase()}_${firstName.toLowerCase()}`;
      return `${baseName}.png`;
    } else {
      baseName = `${lastName.toLowerCase()}_${firstName
        .toLowerCase()
        .charAt(0)}`;
      return `${baseName}.png`;
    }
  }

  return null;
}
