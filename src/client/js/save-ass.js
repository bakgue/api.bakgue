import { async } from "regenerator-runtime";

const saveBtn = document.querySelector("#saveAssBtn");
const assTitle = saveBtn.dataset.title;
let isSavedAss = false;

function handleClickSaveBtn() {
  console.log(isSavedAss);
  if (isSavedAss) {
    isSavedAss = false;
    saveAss();
  } else {
    isSavedAss = true;
    cancelSaveAss();
  }

  checkSavedAss();
}

async function checkSavedAss() {
  const res = await fetch(`/api/assignment/save/${assTitle}/check`, {
    method: "POST",
  });

  const json = await res.json();

  if (json.isSaved === true) {
    changeSavedBtnTo(true);
  } else {
    changeSavedBtnTo(false);
  }
}

async function saveAss() {
  const res = await fetch(`/api/assignment/save/${assTitle}`, {
    method: "POST",
  });

  const status = res.status;
  if (status === 200) {
    changeSavedBtnTo(false);
  } else {
    changeSavedBtnTo(true);
  }
}

async function cancelSaveAss() {
  const res = await fetch(`/api/assignment/save/${assTitle}/cancel`, {
    method: "POST",
  });

  const status = res.status;
  if (status === 200) {
    changeSavedBtnTo(true);
  } else {
    changeSavedBtnTo(false);
  }
}

function changeSavedBtnTo(state) {
  if (state) {
    saveBtn.innerHTML = `<i class="fa-solid fa-bookmark"></i><span>Saved!</span>`;
    saveBtn.style.backgroundColor = "green";
    isSavedAss = true;
  } else {
    saveBtn.innerHTML = `<i class="fa-solid fa-bookmark"></i><span>Save</span>`;
    saveBtn.style.backgroundColor = "orange";
    isSavedAss = false;
  }
}

checkSavedAss();

saveBtn.addEventListener("click", handleClickSaveBtn);
