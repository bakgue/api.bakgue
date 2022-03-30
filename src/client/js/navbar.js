const hamburger = document.querySelector("#hamburger");
const ul = document.querySelector("#header nav ul");
const hamburgerHTML = hamburger;
const navElementArr = document.querySelectorAll(".nav-elemenet");

const maxWidth = 730;
let mode = false;

function handleClickHam(event) {
  checkMode();
}

function handleWindowReszie() {
  checkMode();
  if (hamburger) {
    hamburger.addEventListener("click", handleClickHam);
  }
}

function checkMode() {
  const isWidthAppro = checkWidth();
  if (isWidthAppro) {
    ul.appendChild(hamburger);

    if (mode) {
      mode = false;
      showNavBar();
    } else if (!mode) {
      mode = true;
      hideNavBar();
    }
  } else {
    showNavBar();
    hamburger.remove();
  }
}

function hideNavBar() {
  for (let i = 0; i < navElementArr.length; i++) {
    const element = navElementArr[i];
    element.classList.add("none-display");
  }
}

function showNavBar() {
  for (let i = 0; i < navElementArr.length; i++) {
    const element = navElementArr[i];
    element.classList.remove("none-display");
  }
}

function checkWidth() {
  if (window.innerWidth <= maxWidth) {
    return true;
  } else if (window.innerWidth > maxWidth) {
    return false;
  }
}

checkMode();

if (hamburger) {
  hamburger.addEventListener("click", handleClickHam);
}

window.addEventListener("resize", handleWindowReszie);
