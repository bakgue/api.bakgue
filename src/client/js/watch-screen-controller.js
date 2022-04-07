const fullScreenBtn = document.querySelector("#fullScreenBtn");

const main = document.querySelector(".ass-watch__main");
const sideBar = document.querySelector(".ass-watch__btns");

const sideBarHideDelay = 0.3 * 1000;

let mode = false;

function handleFullScreen(event) {
  changeMode();

  if (mode) {
    hideSideBar();
  } else if (!mode) {
    showSideBar();
  }
}

function hideSideBar() {
  sideBar.style.opacity = 0;

  setTimeout(() => {
    sideBar.style.display = "none";
    main.style.width = "100vw";
    changeIcon();
  }, sideBarHideDelay);
}

function showSideBar() {
  changeIcon();
  sideBar.style.display = "revert";
  main.style.width = "70vw";

  setTimeout(() => {
    sideBar.style.opacity = 1;
  }, sideBarHideDelay);
}

function changeMode() {
  if (mode) {
    mode = false;
  } else if (!mode) {
    mode = true;
  }
}

function changeIcon() {
  if (!mode) {
    fullScreenBtn.classList.remove("fa-compress");
    fullScreenBtn.classList.add("fa-expand");
  } else if (mode) {
    fullScreenBtn.classList.remove("fa-expand");
    fullScreenBtn.classList.add("fa-compress");
  }
}

fullScreenBtn.addEventListener("click", handleFullScreen);
