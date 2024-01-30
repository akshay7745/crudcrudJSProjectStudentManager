const formElement = document.querySelector("form");
const totalStudentCountElement = document.getElementById("totalStudents");
let editId = null;
const nameInp = document.getElementById("name");
const mobileInp = document.getElementById("mobile");
const addressInp = document.getElementById("address");
const ul = document.querySelector("#ulParent");

window.addEventListener("DOMContentLoaded", (e) => {
  axios
    .get(
      "https://crudcrud.com/api/24ac8a0ad3404d3c8b64bc2db1befd6e/studentData"
    )
    .then((res) => {
      res.data.forEach((ele) => {
        const { address, mobile, name, _id } = ele;
        showOnDisplay(name, mobile, address, _id);
      });
      totalStudentCountElement.textContent = res.data.length;
    });
});
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameEle = e.target.name;
  const mobileEle = e.target.mobile;
  const addressEle = e.target.address;
  const userDetails = {
    name: nameEle.value,
    mobile: mobileEle.value,
    address: addressEle.value,
  };
  if (editId) {
    axios
      .put(
        `https://crudcrud.com/api/24ac8a0ad3404d3c8b64bc2db1befd6e/studentData/${editId}`,
        userDetails
      )
      .then((res) => {
        const parentElement = document.getElementById(editId);
        const firstChild = parentElement.firstElementChild;
        const secondChild = firstChild.nextElementSibling;
        const thirdChild = secondChild.nextElementSibling;
        firstChild.textContent = nameEle.value;
        secondChild.textContent = mobileEle.value;
        thirdChild.textContent = addressEle.value;
        editId = null;
      })
      .catch((err) => {
        console.log(err);
      });

    return;
  }
  axios
    .post(
      "https://crudcrud.com/api/24ac8a0ad3404d3c8b64bc2db1befd6e/studentData",
      userDetails
    )
    .then((res) => {
      const { name, mobile, address, _id } = res.data;
      //   console.log(name, mobile, address);
      showOnDisplay(name, mobile, address, _id);
      totalStudentCountElement.textContent =
        +totalStudentCountElement.textContent + 1;
    })
    .catch((err) => console.log(err));
});

ul.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    const parentElement = e.target.parentElement;
    const deleteId = parentElement.getAttribute("id");

    parentElement.parentElement.removeChild(parentElement);
    axios.delete(
      `https://crudcrud.com/api/24ac8a0ad3404d3c8b64bc2db1befd6e/studentData/${deleteId}`
    );
    totalStudentCountElement.textContent =
      +totalStudentCountElement.textContent - 1;
    console.log(parentElement);
  } else if (e.target.classList.contains("editBtn")) {
    const parentElement = e.target.parentElement;
    editId = parentElement.getAttribute("id");
    const firstChild = parentElement.firstElementChild;
    const secondChild = firstChild.nextElementSibling;
    const thirdChild = secondChild.nextElementSibling;
    nameInp.value = firstChild.textContent;
    mobileInp.value = secondChild.textContent;
    addressInp.value = thirdChild.textContent;
  }
});

function showOnDisplay(name, mobile, address, id) {
  const li = document.createElement("li");
  li.setAttribute("id", id);
  li.innerHTML = `<span>${name}</span> <span>${mobile}</span> <span>${address}</span>
    <button class = "deleteBtn">Delele</button> <button class = "editBtn">Edit</button>`;
  ul.appendChild(li);
}
