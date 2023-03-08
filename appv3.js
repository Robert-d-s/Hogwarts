// Define the student object
function Student(firstName, middleName, lastName, nickName, imageName, house) {
  this.firstName = firstName;
  this.middleName = middleName || null;
  this.lastName = lastName;
  this.nickName = nickName || null;
  this.imageName = imageName;
  this.house = house;
}

// Read the JSON data
fetch("https://petlatkea.dk/2021/hogwarts/students.json")
  .then((response) => response.json())
  .then((data) => {
    const students = processStudentData(data);
    displayStudents(students);
  })
  .catch((error) => console.error(error));

function processStudentData(data) {
  const students = [];

  // Loop through each student object in the JSON data
  data.forEach((studentData) => {
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

    // Create a new Student object with the cleaned data
    const student = new Student(
      firstName,
      middleName,
      lastName,
      nickName,
      imageName,
      house
    );

    // Add the new Student object to the array of students
    students.push(student);
  });

  return students;
}

function displayStudents(students) {
  // Generate HTML markup for each student object
  const studentItems = students.map(generateStudentItem);

  // Append the HTML markup to the student list container
  const studentList = document.getElementById("student-list");
  studentList.innerHTML = studentItems.join("");
}

function generateStudentItem(student) {
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
              <p>${student.house}</p>
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
    if (lastName === "Leanne") {
      baseName = `${lastName.toLowerCase()}_${firstName.toLowerCase()}`;
      return `${baseName}_patil.png`;
    } else if (lastName === "Finch-Fletchley") {
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
