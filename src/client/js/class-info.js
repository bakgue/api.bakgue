const buttons = document.querySelectorAll("#chooseElement");
const areas = document.querySelectorAll("#chooseArea");
const NONE_DISPLAY_KEY = "none-display";

function getOrderOfBtn(className) {
	for (let i = 0; i < buttons.length; i++) {
		const btn = buttons[i];
		const haveClassName = btn.classList.contains(className);

		if (haveClassName) {
			return i;
		} else {
			continue;
		}
	}
}

function getAreaByOrder(order) {
	try {
		return areas[order];
	} catch (error) {
		return -1;
	}
}

function showOnlyOneSection(area) {
	for (let i = 0; i < areas.length; i++) {
		const areaInAreas = areas[i];
		areaInAreas.classList.add(NONE_DISPLAY_KEY);
	}

	area.classList.remove(NONE_DISPLAY_KEY);
}

function handleClickButtons() {
	const order = getOrderOfBtn(this.classList[this.classList.length - 1]);
	const area = getAreaByOrder(order);

	showOnlyOneSection(area);
}

for (let i = 0; i < buttons.length; i++) {
	const btn = buttons[i];

	btn.addEventListener("click", handleClickButtons);
}
