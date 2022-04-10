const submitBtn = document.querySelector("#submitBtn");
const inputTags = {
  from: {
    fromMonth: document.querySelector("#fromMonth"),
    fromDay: document.querySelector("#fromDay"),
    fromClass: document.querySelector("#fromClass"),
  },
  to: {
    toMonth: document.querySelector("#toMonth"),
    toDay: document.querySelector("#toDay"),
    toClass: document.querySelector("#toClass"),
  },
};

const passCondition = {
  from: {
    fromMonth: false,
    fromDay: false,
    fromClass: false,
  },
  to: {
    toMonth: false,
    toDay: false,
    toClass: false,
  },
};

function handleChangeInput(event) {
  const target = event.target;
  const value = event.target.value;
  const id = target.getAttribute("id");
  const type = id.replace("from", "").replace("to", "").toLowerCase();
  // 이 변수 이름을 뭐라해야하지
  const genre = id.replace("Month", "").replace("Day", "").replace("Class", "");

  checkValue(type, genre, value);
}

function checkValue(type, genre, value) {
  if (type === "month" || type === "day" || type === "class") {
    if (!isNaN(value) && Number.isInteger(Number(value))) {
      const valueInHere = Number(value);
      if (type === "month") {
        if (4 <= valueInHere && valueInHere <= 12) {
          changePassCondition(type, genre, true);
        } else {
          changePassCondition(type, genre, false);
        }
      } else if (type === "day") {
        if (1 <= valueInHere && valueInHere <= 31) {
          changePassCondition(type, genre, true);
        } else {
          console.log("Hello");
          changePassCondition(type, genre, false);
        }
      } else if (type === "class") {
        if (1 <= valueInHere && valueInHere <= 7) {
          changePassCondition(type, genre, true);
        } else {
          changePassCondition(type, genre, false);
        }
      }
    }
  } else {
    console.error("Type 의 형태가 맞지 않습니다");
  }

  checkPassCondition();
}

function changeSubmitBtn(to) {
  if (to) {
    submitBtn.disabled = false;
  } else if (!to) {
    submitBtn.disabled = true;
  }
}

// changePassCondition("from", "month", true);
function changePassCondition(genre, type, to) {
  console.log(type, genre, to);
  eval(
    `passCondition.${type}.${type}${
      genre.charAt(0).toUpperCase() + genre.slice(1)
    } = ${to}`
  );
}

function checkPassCondition() {
  const passConditionArr = [];

  for (const fromto in passCondition) {
    if (Object.hasOwnProperty.call(passCondition, fromto)) {
      const uni = passCondition[fromto];

      for (const i in uni) {
        if (Object.hasOwnProperty.call(uni, i)) {
          const element = uni[i];
          passConditionArr.push(element);
        }
      }
    }
  }

  console.log(passConditionArr);

  const isPass = passConditionArr.every((value) => value === true);

  if (isPass) {
    changeSubmitBtn(true);
  } else {
    changeSubmitBtn(false);
  }
}

for (const fromto in inputTags) {
  if (Object.hasOwnProperty.call(inputTags, fromto)) {
    const unit = inputTags[fromto];

    for (const i in unit) {
      if (Object.hasOwnProperty.call(unit, i)) {
        const element = unit[i];
        element.addEventListener("change", handleChangeInput);
      }
    }
  }
}

changeSubmitBtn(false);
