const input = document.querySelector("#name");
const assName = input.dataset.title;
const submitInput = document.querySelector(".submit-btn");

let pass = false;

function handleChangeInput(event) {
  const inputValue = event.target.value;

  if (String(inputValue) === String(assName)) {
    pass = true;
  }

  check();
}

function init() {
  submitInput.disabled = true;
}

function check() {
  if (pass) {
    submitInput.disabled = false;
  } else {
    submitInput.disabled = true;
  }
}

init();

input.addEventListener("input", handleChangeInput);
