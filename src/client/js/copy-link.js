const copyUrlBtn = document.querySelector("#copyUrlBtn");

function handleClickCopyUrlBtn() {
  const copiedText = window.location.href;

  navigator.clipboard
    .writeText(copiedText)
    .then(() => {
      copyUrlBtn.innerHTML =
        '<i class"fa-solid fa-bookmark"></i><span>Copied!</span>';
    })
    .catch((error) => {
      console.log(error);
    });
}

copyUrlBtn.addEventListener("click", handleClickCopyUrlBtn);
