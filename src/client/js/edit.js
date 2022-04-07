import { marked } from "marked";

const editDiv = document.querySelector(".edit__edit");
const watchDiv = document.querySelector(".edit__watch");

const markdownArea = document.querySelector(".markdown-body");
const editMarkdownArea = document.querySelector("#content");

const editIcon = document.querySelector(".fa-pen-to-square");
const watchIcon = document.querySelector(".fa-eye");

function handleClickEditIcon() {
  editDiv.classList.remove("none-display");
  watchDiv.classList.add("none-display");
}

function handleClickWatchIcon() {
  initWatchDiv();

  editDiv.classList.add("none-display");
  watchDiv.classList.remove("none-display");
}

function handleTextareaChange() {
  editMarkdownArea.style.height = editMarkdownArea.scrollHeight + "px";
}

function initWatchDiv() {
  const content = editMarkdownArea.value;
  const markdown = marked.parse(content);
  markdownArea.innerHTML = markdown;
}

editIcon.addEventListener("click", handleClickEditIcon);
watchIcon.addEventListener("click", handleClickWatchIcon);
editMarkdownArea.addEventListener("input", handleTextareaChange);

handleTextareaChange();
