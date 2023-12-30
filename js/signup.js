// DOM elements
var nameInput = document.querySelector("#nameInput");
var emailInput = document.querySelector("#emailInput");
var passwordInput = document.querySelector("#passwordInput");
var signupButton = document.querySelector("#signupButton");
var signupButtonLink = document.querySelector("#signupButtonLink");

// Message elements
var paragraphIncorrect = document.querySelector(".p-incorrect");
var paragraphRequired = document.querySelector(".p-required");
var paragraphSuccess = document.querySelector(".p-success");
var paragraphExists = document.querySelector(".p-exists");
var nameWrong = document.querySelector(".name-wrong");
var emailWrong = document.querySelector(".email-wrong");

// Regex patterns
var passwordWrong = document.querySelector(".password-wrong");
var emailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
var passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

// Store users in array
var userArray = [];

// get users form localStorage if exist
if (JSON.parse(localStorage.getItem("user")) != null) {
  userArray = JSON.parse(localStorage.getItem("user"));

  console.log(userArray);
}

// Check if no inputs values
signupButton.addEventListener("click", function () {
  if (
    nameInput.value == "" ||
    emailInput.value == "" ||
    passwordInput.value == ""
  ) {
    paragraphRequired.classList.replace("d-none", "d-block");
  } else {
    paragraphRequired.classList.replace("d-block", "d-none");
    signupForm();
  }
});

// Validate Username
nameInput.addEventListener("keyup", function () {
  if (nameInput.value.length < 5) {
    nameInput.classList.add("is-invalid");
    nameInput.classList.add("form-control-wrong");
    nameWrong.classList.replace("d-none", "d-block");
  } else {
    nameInput.classList.replace("is-invalid", "is-valid");
    nameWrong.classList.replace("d-block", "d-none");
    nameInput.classList.replace("form-control-wrong", "form-control-right");
  }
});

// Validate Email
emailInput.addEventListener("keyup", function () {
  if (emailRegex.test(emailInput.value) == false) {
    emailInput.classList.add("is-invalid");
    emailInput.classList.add("form-control-wrong");
    emailWrong.classList.replace("d-none", "d-block");
  } else {
    emailInput.classList.replace("is-invalid", "is-valid");
    emailWrong.classList.replace("d-block", "d-none");
    emailInput.classList.replace("form-control-wrong", "form-control-right");
  }
});

// Validate password
passwordInput.addEventListener("keyup", function () {
  if (passwordRegex.test(passwordInput.value) == false) {
    passwordInput.classList.add("is-invalid");
    passwordInput.classList.add("form-control-wrong");
    passwordWrong.classList.replace("d-none", "d-block");
  } else {
    passwordInput.classList.replace("form-control-wrong", "form-control-right");
    passwordInput.classList.replace("is-invalid", "is-valid");
    passwordWrong.classList.replace("d-block", "d-none");
  }
});

// signup
function signupForm() {
  if (
    nameInput.value.length < 5 ||
    emailRegex.test(emailInput.value) == false ||
    passwordRegex.test(passwordInput.value) == false
  ) {
    paragraphIncorrect.classList.replace("d-none", "d-block");
  } else {
    if (checkForm() == false) {
      paragraphExists.classList.replace("d-none", "d-block");
      paragraphSuccess.classList.replace("d-block", "d-none");
    } else {
      var user = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      };
      userArray.push(user);
      localStorage.setItem("user", JSON.stringify(userArray));
      clearForm();
      signupButtonLink.setAttribute("href", "index.html");
      paragraphExists.classList.replace("d-block", "d-none");
      paragraphSuccess.classList.replace("d-none", "d-block");
      console.log(userArray);
    }
  }
}

// Check if user exist
function checkForm() {
  for (let i = 0; i < userArray.length; i++) {
    if (emailInput.value.toLowerCase() == userArray[i].email.toLowerCase()) {
      return false;
    }
  }
}

// Clear Form
function clearForm() {
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  nameInput.classList.remove("is-valid");
  emailInput.classList.remove("is-valid");
  passwordInput.classList.remove("is-valid");
  nameInput.classList.remove("form-control-right");
  emailInput.classList.remove("form-control-right");
  passwordInput.classList.remove("form-control-right");
}
