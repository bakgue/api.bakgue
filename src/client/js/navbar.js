const hamburger = document.querySelector("#hamburger");
const navElementArr = document.querySelectorAll(".nav-elemenet");

const maxWidth = 730;
let mode = false;

function handleClickHam(event) {
  checkMode();
}

function checkMode() {
  if (mode) {
    mode = false;
    showNavBar();
  } else if (!mode) {
    mode = true;
    hideNavBar();
  }
}

function hideNavBar() {
  const isWidthAppro = checkWidth();
  if (isWidthAppro) {
    console.log("Hide");
    for (let i = 0; i < navElementArr.length; i++) {
      const element = navElementArr[i];
      element.classList.add("none-display");
    }
  }
}

function showNavBar() {
  const isWidthAppro = checkWidth();
  if (isWidthAppro) {
    console.log("Show");
    for (let i = 0; i < navElementArr.length; i++) {
      const element = navElementArr[i];
      element.classList.remove("none-display");
    }
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
