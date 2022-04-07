import { marked } from "marked";

const markdownArea = assignment.querySelector(".markdown-body");

let markdownContent = markdownArea.dataset.content;

markdownArea.innerHTML = marked.parse(markdownContent);
