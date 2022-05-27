const form = document.querySelector("#createIssue");
const createIssueBtn = document.querySelector("#createIssueBtn");
const textarea = document.querySelector("#issueContent");

const emojis = document.querySelectorAll("#emoji");

async function handleClickCreateIssueForm(event) {
  event.preventDefault();

  const responses = await fetch(`/api/assignment/test/issues/create/${textarea.value}`, {
    method: "POST",
  })

  if (responses.status === 200) {
    textarea.value = "";
    window.location.reload();
  }
}

async function handleClickEmojis(event) {
  event.preventDefault();

  let target;
  let issueId;
  for (let i = 0; i < event.path.length; i++) {
    const element = event.path[i];
    if (element.classList[0] === "issue__emotion") {
      target = element;
    }
    if (element.id === "issue") {
      issueId = element.dataset.id;
      break
    }
  }

  const type = target.dataset.type;
  const assName = window.location.pathname.replace("/assignment/", "");

  if (target.classList.contains("selected")) {
    const responses = await fetch(`/api/assignment/${assName}/issues/${issueId}/emotion/delete/${type}`, {
      method: "POST"
    })

    if (responses.status === 200) {
      target.classList.remove("selected")
      const span = target.querySelector(".issue__emotion__num > span");
      span.innerText = Number(span.innerText) - 1;
    }

  } else {
    const responses = await fetch(`/api/assignment/${assName}/issues/${issueId}/emotion/add/${type}`, {
      method: "POST"
    })

    if (responses.status === 200) {
      target.classList.add("selected")
      const span = target.querySelector(".issue__emotion__num > span");
      span.innerText = Number(span.innerText) + 1;
    }
  }
}

form.addEventListener("submit", handleClickCreateIssueForm);

for (let i = 0; i < emojis.length; i++) {
  const element = emojis[i];
  element.addEventListener("click", handleClickEmojis);
}
