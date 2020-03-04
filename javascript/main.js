// Input Fields
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const email = document.getElementById("email");

// Form
const form = document.getElementById("myForm");

//Validation colors;
const green = "#4CAF50";
const red = "#F44336";

//Handles form
form.addEventListener("submit", function(event) {
  document.preventDefault();

  if (
    validateFirstName() &&
    validateLastName() &&
    validatePassword() &&
    validateConfirmPassword() &&
    validateEmail()
  ) {
    //Creating progress bar on submit click
    const name = firstName.value;
    const container = document.querySelector("div.container");
    const loader = document.createElement("div");
    loader.className = "progress";
    const loadingBar = document.createElement("div");
    loadingBar.className = "indeterminate";
    loader.appendChild(loadingBar);
    container.appendChild(loader);

    setTimeout(() => {
      const loaderDiv = document.querySelector("div.progress");
      const panel = document.createElement("div");
      panel.className = "card-panel green";
      const text = document.createElement("span");
      text.appendChild(
        document.createTextNode(`Sign up complete! Welcome ${name}!`)
      );
      panel.appendChild(text);
      container.replaceChild(panel, loaderDiv);
    }, 1000);
  }
});

function validateFirstName() {
  // Check if the field empty.
  if (checkifEmpty(firstName)) return;
  // Is if it has only letters
  if (!checkIfOnlyLetters(firstName)) return;
  return true;
}
function validateLastName() {
  // Check if the field empty.
  if (checkifEmpty(lastName)) return;
  // Is if it has only letters
  if (!checkIfOnlyLetters(lastName)) return;
  return true;
}

function validatePassword() {
  if (checkifEmpty(password)) return;
  // Check length of password
  if (!meetLength(password, 6, 25)) return;
  // check password to see if required chars are there.
  if (!containsCharacters(password, 1)) return;
  return true;
}

function validateConfirmPassword() {
  if (password.className !== "valid") {
    setInvalid(confirmPassword, "Password must be valid");
    return;
  }
  if (password.value !== confirmPassword) {
    setInvalid(confirmPassword, "Passwords must match");
    return;
  } else {
    setValid(confirmPassword);
  }
  return true;
}

function validateEmail() {
  if (checkifEmpty(email)) return;
  if (!containsCharacters(field, 2)) return;
  return true;
}

function checkifEmpty(field) {
  if (isEmpty(field.value.trim())) {
    //Field is invalid if empty
    setInvalid(field, `${field.name} must not be empty`);
    return true;
  } else {
    // Set field to valid and return false;
    setValid(field);
    return false;
  }
}

function isEmpty(value) {
  if (value === "") return true;
  return false;
}

function setInvalid(field, message) {
  field.className = "invalid";
  field.nextElementSibling.innerHTML = message;
  field.nextElementSibling.style.color = red;
}

function setValid(field) {
  field.className = "valid";
  field.nextElementSibling.innerHTML = "";
  field.nextElementSibling.style.color = green;
}

function checkIfOnlyLetters(field) {
  if (/^[a-zA-z ]+$/.test(field.value)) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, `${field.name} must contain only letters`);
  }
}

function meetLength(field, minLen, maxLen) {
  if (field.value.length >= minLen && field.value.length <= maxLen) {
    setValid(field);
    return true;
  } else if (field.value.length < minLen) {
    setInvalid(
      field,
      `${field.name} must be as least ${minLen} characters long`
    );
  } else {
    setInvalid(field, `${field.name} must be shorter than ${maxLen}`);
    return false;
  }
}

function containsCharacters(field, code) {
  switch (code) {
    //Case for PASSWORD
    case 1:
      let rexEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
      return matchWithRegEx(
        rexEx,
        field,
        `Must contain at least 1 Uppercase letter, 1 Lowercase letter, 1 number and 1 special character`
      );
    //Case for EMAIL
    case 2:
      let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return matchWithRegEx(regEx, field, "Must be a valid email");
    default:
      return false;
  }
}

function matchWithRegEx(regEx, field, message) {
  if (field.value.match(regEx)) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, message);
    return false;
  }
}
