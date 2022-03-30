const tags = {
  seatingChart: {
    btn: document.querySelector("#seatingChartBtn"),
    area: document.querySelector("#seatingChart"),
  },
  schedule: {
    btn: document.querySelector("#scheduleBtn"),
    area: document.querySelector("#schedule"),
  },
  lunchSchedule: {
    btn: document.querySelector("#lunchScheduleBtn"),
    area: document.querySelector("#lunchSchedule"),
  },
};

function showSection(areaName) {
  for (const section in tags) {
    if (Object.hasOwnProperty.call(tags, section)) {
      const element = tags[section];
      if (String(areaName) === String(section)) {
        element.area.classList.remove("none-display");
      } else {
        element.area.classList.add("none-display");
      }
    }
  }
}

for (const key in tags) {
  if (Object.hasOwnProperty.call(tags, key)) {
    const element = tags[key];
    element.btn.addEventListener("click", () => {
      showSection(key);
    });
  }
}
