import { STATUS_CODE } from "./rootController";
import { BASE_PUG_PATH } from "./rootController";

const CLASS_PUG_PATH = BASE_PUG_PATH + "class/";

import subjectInfo from "/src/json/subject.json";
import studentInfo from "/src/json/student.json";
import classInfo from "/src/json/class.json";

let seatingChartNumbers = classInfo.seatingChart;
let scheduleOnlyName = classInfo.schedule;

// Seating Chart List 안의 숫자를 이용해 Student Info 안에서 찾고, 그것을 Seating Chart List 안에 넣기
const seatingChart = contractStudent(seatingChartNumbers);
const schedule = contractSchedule(scheduleOnlyName);

export const getClass = (req, res) => {
  return res.render(CLASS_PUG_PATH + "home", {
    seatingChart,
    schedule,
  });
};

function contractStudent(seatingCharts) {
  for (let i = 0; i < seatingCharts.length; i++) {
    let column = seatingCharts[i];

    for (let j = 0; j < column.length; j++) {
      let element = column[j];
      let currectStudent;

      if (element < 10) {
        element = `0${element}`;
      } else {
        element = `${element}`;
      }

      for (let k = 0; k < studentInfo.length; k++) {
        const student = studentInfo[k];

        if (student.id === `202${element}`) {
          currectStudent = student;
          seatingCharts[i][j] = currectStudent;
        }
      }
    }
  }
  return seatingCharts;
}

function contractSchedule(schedules) {
  for (let i = 0; i < schedules.length; i++) {
    const day = schedules[i];

    for (let j = 0; j < day.length; j++) {
      const subject = day[j];

      for (let k = 0; k < subjectInfo.length; k++) {
        const subjectInSubjectInfo = subjectInfo[k];

        if (String(subject) === String(subjectInSubjectInfo.englishName)) {
          schedules[i][j] = subjectInSubjectInfo;
        }
      }
    }
  }

  return schedules;
}
