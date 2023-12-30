// DOM elements
var emailInput = document.querySelector("#emailInput");
var passwordInput = document.querySelector("#passwordInput");
var loginButton = document.querySelector("#loginButton");
var loginButtonLink = document.querySelector("#loginButtonLink");

// Message elements
var paragraphRequired = document.querySelector(".p-required");
var paragraphIncorrect = document.querySelector(".p-incorrect");
var paragraphUser = document.querySelector(".p-user");
var emailWrong = document.querySelector(".email-wrong");
var passwordWrong = document.querySelector(".password-wrong");

// Regex patterns
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

// Check if no inputs values or no user in localStorage
loginButton.addEventListener("click", function () {
  if (emailInput.value == "" || passwordInput.value == "") {
    paragraphRequired.classList.replace("d-none", "d-block");
  } else {
    if (userArray.length == 0) {
      paragraphUser.classList.replace("d-none", "d-block");
      paragraphRequired.classList.replace("d-block", "d-none");
    } else {
      paragraphUser.classList.replace("d-block", "d-none");
      paragraphRequired.classList.replace("d-block", "d-none");
      loginForm();
    }
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

// Validate Password
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

// Login
function loginForm() {
  if (isExist() == true) {
    paragraphIncorrect.classList.replace("d-block", "d-none");
    paragraphRequired.classList.replace("d-block", "d-none");
    loginButtonLink.setAttribute("href", "home.html");
  } else {
    paragraphRequired.classList.replace("d-block", "d-none");
    paragraphIncorrect.classList.replace("d-none", "d-block");
  }
}

// Check if user exists
function isExist() {
  for (let i = 0; i < userArray.length; i++) {
    if (
      emailInput.value.toLowerCase() == userArray[i].email.toLowerCase() &&
      passwordInput.value == userArray[i].password
    ) {
      localStorage.setItem("username", userArray[i].name);
      return true;
    }
  }
}
