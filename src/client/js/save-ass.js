import { async } from "regenerator-runtime";

const saveBtn = document.querySelector("#saveAssBtn");
const assTitle = saveBtn.dataset.title;
let isSavedAss = false;

function handleClickSaveBtn() {
  if (isSavedAss) {
    isSavedAss = false;
    cancelAss();
  } else {
    isSavedAss = true;
    saveAss();
  }

  checkSavedAss();
}

async function checkSavedAss() {
  const res = await fetch(`/api/assignment/${assTitle}/save/check`, {
    method: "POST",
  });
  const json = await res.json();

  if (json.isSaved) {
    changeSavedBtnTo(true);
    isSavedAss = true;
  } else {
    console.log("hello");
    changeSavedBtnTo(false);
    isSavedAss = false;
  }
}

async function saveAss() {
  const res = await fetch(`/api/assignment/${assTitle}/save`, {
    method: "POST",
  });

  const status = res.status;
  if (status === 200) {
    changeSavedBtnTo(true);
  }
}

async function cancelAss() {
  const res = await fetch(`/api/assignment/${assTitle}/save/cancel`, {
    method: "POST",
  });
  const status = res.status;

  if (status === 200) {
    changeSavedBtnTo(false);
  } else {
    changeSavedBtnTo(true);
  }
}

function changeSavedBtnTo(state) {
  saveBtn.classList.remove("selected");
  saveBtn.removeChild(saveBtn.querySelector("i"))
  saveBtn.removeChild(saveBtn.querySelector("span"));

  const iconTag = document.createElement("i");
  const span = document.createElement("span");

  iconTag.classList.add("fa-solid");
  iconTag.classList.add("fa-bookmark");

  if (state) {
    span.innerText = "Saved!";
    saveBtn.classList.remove("save-btn");
    saveBtn.classList.add("copy-btn");
    isSavedAss = true;
  } else if (!state) {
    span.innerText = "Save";
    saveBtn.classList.remove("copy-btn");
    saveBtn.classList.add("save-btn");
    isSavedAss = false;
  }

  saveBtn.appendChild(iconTag);
  saveBtn.appendChild(span);
}


checkSavedAss();

saveBtn.addEventListener("click", handleClickSaveBtn);
