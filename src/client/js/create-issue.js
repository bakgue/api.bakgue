const assName = document.querySelector("#assName").dataset.name;
const form = document.querySelector("#createIssue");
const createIssueBtn = document.querySelector("#createIssueBtn");
const textarea = document.querySelector("#issueContent");

async function handleClickCreateIssueForm(event) {
  event.preventDefault();

  const responses = await fetch(`/api/assignment/${assName}/issues/create/${textarea.value}`, {
    method: "POST",
  })

  createIssueBtn.classList.remove("submit-btn");
  createIssueBtn.classList.remove("danger-btn");
  createIssueBtn.classList.add("disabled-btn");
  createIssueBtn.value = "Send Issues..."

  if (responses.status === 200) {
    createIssueBtn.classList.remove("disabled-btn");
    createIssueBtn.classList.add("submit-btn")
    textarea.value = "";
    window.location.reload();
  } else if (responses.status === 400) {
    createIssueBtn.classList.remove("disabled-btn");
    createIssueBtn.classList.add("danger-btn")
    createIssueBtn.value = "Oh, There is an error, Please try it again.";
  }
}

form.addEventListener("submit", handleClickCreateIssueForm);
