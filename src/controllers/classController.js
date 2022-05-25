import subjectInfo from "../../json/subject.json";
import studentInfo from "../../json/student.json";
import seatingChart from "../../json/class.json";

import { STATUS_CODE } from "./rootController";
import { BASE_PUG_PATH } from "./rootController";

import Timetable from "comcigan-parser";

const CLASS_PUG_PATH = BASE_PUG_PATH + "class/";
const timetable = new Timetable();

const seatingChartWithStudentObj = contractStudent(seatingChart);

export const getClass = async (req, res) => {
  await timetable.init();
  const schoolList = await timetable.search("늘푸른");
  const targetSchool = schoolList.find((school) => {
    return school.region === '경기' && school.name === '늘푸른중학교';
  });
  await timetable.setSchool(targetSchool.code);
  const schoolScheduleResult = await timetable.getTimetable();
  const schoolSchedule = schoolScheduleResult['2']['2'];

  for (let i = 0; i < schoolSchedule.length; i++) {
    const day = schoolSchedule[i];
    for (let j = 0; j < day.length; j++) {
      const classes = day[j];
      const subjectOfClasses = classes.subject;
      for (const k in subjectInfo) {
        if (Object.hasOwnProperty.call(subjectInfo, k)) {
          const subjectInSubjectInfo = subjectInfo[k];
          if (subjectOfClasses === "스포" || subjectOfClasses === "창체") {
            schoolSchedule[i][j] = subjectInfo["No-Subject"];
          }
          if (subjectOfClasses === subjectInSubjectInfo.name) {
            schoolSchedule[i][j] = subjectInSubjectInfo;
          }
        }
      }
    }
  }

    return res.render(CLASS_PUG_PATH + "home", {
      seatingChartWithStudentObj,
      schoolSchedule,
      lunchMenu
    });
});
};

function contractStudent(seatingCharts) {
  for (let i = 0; i < seatingCharts.length; i++) {
    let column = seatingCharts[i];

    for (let j = 0; j < column.length; j++) {
      let currentStudent = column[j];
      let currectStudent;

      if (currentStudent < 10) {
        currentStudent = `0${currentStudent}`;
      } else {
        currentStudent = `${currentStudent}`;
      }

      const isExists = studentInfo[`202${currentStudent}`];
      seatingCharts[i][j] = isExists;
    }
  }
  return seatingCharts;
}

