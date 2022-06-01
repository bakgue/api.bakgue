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

function toggleMode() {
	if (mode) {
		mode = false;
	} else {
		mode = true;
	}

	toggleShowArea();
}

async function saveInformation(username, bio) {
	const response = await fetch(`api/profile/edit/${username}/${bio}`, {
		method: "POST",
	});

	if (response.status === 200) {
		toggleMode();
	}
}

function toggleShowArea() {
	if (mode) {
		profileEdit.classList.remove(NONE_DISPLAY_KEY);
		profileShow.classList.add(NONE_DISPLAY_KEY);

		cancelBtn.addEventListener(CLICK_EVENT_KEY, handleClickCancelBtn);
		saveBtn.addEventListener(CLICK_EVENT_KEY, handleClickSaveBtn);
	} else {
		profileEdit.classList.add(NONE_DISPLAY_KEY);
		profileShow.classList.remove(NONE_DISPLAY_KEY);

		cancelBtn.removeEventListener(CLICK_EVENT_KEY, handleClickCancelBtn);
		saveBtn.removeEventListener(CLICK_EVENT_KEY, handleClickSaveBtn);
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
