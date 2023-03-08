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
