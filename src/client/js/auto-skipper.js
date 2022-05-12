const autoSkipArea = document.querySelector("#autoSkip");
const autoSkipElements = autoSkipArea.querySelectorAll("input");

const passLetters = [];

function handleInput(event) {
  const value = event.target.value;

  if (value in passLetters) {
    event.target.nextElementSibling.focus();
  } else {
    event.target.value = "";
  }
}

function initPassLetters(array) {
  let i = 0;
  while (i < 10) {
    array.push(String(i));
    i += 1;
  }

  return array;
}

for (let i = 0; i < autoSkipElements.length; i++) {
  const input = autoSkipElements[i];
  input.addEventListener("input", handleInput);
}

initPassLetters(passLetters);
