const autoSkipArea = document.querySelector("#autoSkip");
const autoSkipElements = autoSkipArea.querySelectorAll("input");
const passLetters = [];

function handleInput(event) {
  const value = event.target.value;
  const maxLength = event.target;
  const isClassIdInputs = event.path[1].classList["0"] === "inputs";

  if (isClassIdInputs) {
    if (value in passLetters) {
      try {
        event.target.nextElementSibling.focus();
      } catch (error) {
        document.querySelector(".student-info > input").focus();
      }
    } else {
      event.target.value = "";
    }
  } else {
    const nameOfInputs = event.target.name;
    const value = event.target.value.length;
    const maxLengthOfInput = event.target.maxLength;

    if (value >= maxLengthOfInput) {
      if (nameOfInputs === "key") {
        document
          .querySelector(".student-info .inputs input:first-child")
          .focus();
      } else if (nameOfInputs === "name") {
        try {
          document.querySelector(".form__element input#username").focus();
        } catch (error) {
          document.querySelector(".form__element input#password").focus();
        }
      }
    }
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
  const classOfInput = input.className;
  const isMatched = classOfInput.match("autoSkipIgnore");
  if (!isMatched) {
    input.addEventListener("input", handleInput);
  } else {
  }
}

initPassLetters(passLetters);
initPassLetters(passLetters);
