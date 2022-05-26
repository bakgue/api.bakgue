const form = document.querySelector("#createIssue");
const createIssueBtn = document.querySelector("#createIssueBtn");
const textarea = document.querySelector("#issueContent");

async function handleClickCreateIssueForm(event) {
  event.preventDefault();
  console.log(textarea.value);

  const responses = await fetch(`/api/assignment/test/issues/create/${textarea.value}`, {
    method: "POST",
  })

  if (responses.status === 200) {
    textarea.value = "";
    window.location.reload();
  }
}

form.addEventListener("submit", handleClickCreateIssueForm);
