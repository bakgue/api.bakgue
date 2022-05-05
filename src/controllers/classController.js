import { STATUS_CODE } from "./rootController";
import { BASE_PUG_PATH } from "./rootController";

const CLASS_PUG_PATH = BASE_PUG_PATH + "class/";

import subjectInfo from "../../json/subject.json";
import studentInfo from "../../json/student.json";
import seatingChart from "../../json/class.json";

// Seating Chart List 안의 숫자를 이용해 Student Info 안에서 찾고, 그것을 Seating Chart List 안에 넣기
const seatingChartWithStudentObj = contractStudent(seatingChart);

export const getClass = (req, res) => {
  return res.render(CLASS_PUG_PATH + "home", {
    seatingChartWithStudentObj,
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
