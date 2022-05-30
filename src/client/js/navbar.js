const main = document.querySelector("#main");
const hamburger = document.querySelector("#hamburger");
const ul = document.querySelector("#header nav ul");
const navElementArr = document.querySelectorAll(".nav-elemenet");

const maxWidth = 730;
let mode = false;

function handleClickHam() {
	checkMode(true);
}

function handleClickMain() {
	mode = false;
	checkMode(false);
	mode = true;
}

function handleWindowReszie() {
	mode = false;
	checkMode(true);
	if (hamburger) {
		hamburger.addEventListener("click", handleClickHam);
	}

	const vw = window.innerWidth;

	const html = document.querySelector("html");
	const body = document.querySelector("body");
	const header = document.querySelector("#header");
	const main = document.querySelector("#main");

	const elements = [html, body, header, main];
	for (let i = 0; i < elements.length; i++) {
		const element = elements[i];
		element.style.width = `${vw}px`;
	}
}

function checkMode(modeChange = true) {
	const isWidthAppro = checkWidth();
	if (isWidthAppro) {
		if (!document.querySelector("#hamburger")) {
			ul.appendChild(hamburger);
		}

		if (mode) {
			if (modeChange) {
				mode = false;
			}
			showNavBar();
		} else if (!mode) {
			if (modeChange) {
				mode = true;
			}
			hideNavBar();
		}
	} else {
		showNavBar();
		hamburger.remove();
	}
}

function hideNavBar() {
	for (let i = 0; i < navElementArr.length; i++) {
		const element = navElementArr[i];
		element.classList.add("none-display");
	}
}

function showNavBar() {
	for (let i = 0; i < navElementArr.length; i++) {
		const element = navElementArr[i];
		element.classList.remove("none-display");
	}
}

function checkWidth() {
	if (window.innerWidth <= maxWidth) {
		return true;
	} else if (window.innerWidth > maxWidth) {
		return false;
	}
}

checkMode();

if (hamburger) {
	hamburger.addEventListener("click", handleClickHam);
}

window.addEventListener("resize", handleWindowReszie);

main.addEventListener("click", handleClickMain);
