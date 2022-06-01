const editProfileBtn = document.querySelector("#editProfile");

const cancelBtn = document.querySelector("#cancel");
const saveBtn = document.querySelector("#edit");

const usernameInput = document.querySelector("#usernameInput");
const bioInput = document.querySelector("#bioInput");

const profileShow = document.querySelector("#profileShow");
const profileEdit = document.querySelector("#profileEdit");

const NONE_DISPLAY_KEY = "none-display";
const CLICK_EVENT_KEY = "click";

let mode = false;
let OK = false;

function toggleMode() {
	if (mode) {
		mode = false;
	} else {
		mode = true;
	}

	toggleShowArea();
}

async function saveInformation(username, bio) {
	if (bio.length === 0) {
		bio = "false";
	}

	const response = await fetch(`api/profile/edit/${username}/${bio}`, {
		method: "POST",
	});

	if (response.status === 200) {
		toggleMode();
		location.reload();
	}
}

function toggleShowArea() {
	if (mode) {
		profileEdit.classList.remove(NONE_DISPLAY_KEY);
		profileShow.classList.add(NONE_DISPLAY_KEY);

		cancelBtn.addEventListener(CLICK_EVENT_KEY, handleClickCancelBtn);
		saveBtn.addEventListener(CLICK_EVENT_KEY, handleClickSaveBtn);
		usernameInput.addEventListener("input", checkOk);
	} else {
		profileEdit.classList.add(NONE_DISPLAY_KEY);
		profileShow.classList.remove(NONE_DISPLAY_KEY);

		cancelBtn.removeEventListener(CLICK_EVENT_KEY, handleClickCancelBtn);
		saveBtn.removeEventListener(CLICK_EVENT_KEY, handleClickSaveBtn);
		usernameInput.removeEventListener("input", checkOk);
	}
}

function checkOk(event) {
	const value = event.target.value;
	if (value.length === 0) {
		OK = false;
		saveBtn.disabled = true;
	} else {
		OK = true;
		saveBtn.disabled = false;
	}
}

function handleClickSaveBtn() {
	const usernameValue = usernameInput.value;
	const bioValue = bioInput.value;
	saveInformation(usernameValue, bioValue);
}

function handleClickCancelBtn() {
	toggleMode();
}

function handleClickEditProfileBtn() {
	toggleMode();
}

editProfileBtn.addEventListener("click", handleClickEditProfileBtn);
