const assignment = document.querySelector("#assignment");
const markdownBody = assignment.querySelector(".markdown-body");
const resInServer = JSON.parse(assignment.dataset.res);

function getMarkdown(html) {
  if (resInServer.status !== 200) {
    writeInAss(
      `<h1>Here is an Error</h1><p>Please <a href="${window.location}">refresh</a> again.</p>`
    );
  } else if (resInServer.status === 200) {
    writeInAss(html);
  }
}

function writeInAss(content) {
  markdownBody.innerHTML = content;
}

getMarkdown(resInServer.data);
