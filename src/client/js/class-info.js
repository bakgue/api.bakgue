import { async } from "regenerator-runtime";

const url = "https://schoolmenukr.ml/api/middle/J100005136";

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

function handleGetLunch(error, res, html) {
  if (error) {
    throw error;
  }
  console.log(html);
}

async function getLunchSchedule() {
  // const hello = request(url, handleGetLunch);
  const response = await fetch(url, {
    method: "GET",
  });

  const data = await response.json();
  const menu = data.menu;
  console.log(menu);
}

for (const key in tags) {
  if (Object.hasOwnProperty.call(tags, key)) {
    const element = tags[key];
    element.btn.addEventListener("click", () => {
      showSection(key);
    });
  }
}
getLunchSchedule();
