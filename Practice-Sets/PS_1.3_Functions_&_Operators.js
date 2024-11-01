const studentData = [
  { studentName: "John", rollNo: 201, science: 88, history: 75, geography: 90 },
  {
    studentName: "Alice",
    rollNo: 202,
    science: 92,
    history: 85,
    geography: 88,
  },
  { studentName: "Bob", rollNo: 203, science: 78, history: 89, geography: 91 },
];

// Exercise 1: Report Card Generation
function generateReportCard(rollNo) {
  const student = studentData.find((student) => student.rollNo === rollNo);

  if (student) {
    console.log(`====== Report Card for ${student.studentName} ======`);
    console.log(`Roll No. : ${student.rollNo}`);
    console.log("------");
    console.log("Marks:");
    console.log("------");
    console.log(`science: ${student.science}`);
    console.log(`history: ${student.history}`);
    console.log(`geography: ${student.geography}`);
    console.log("------ ------ ------");
  } else {
    console.log(`Student with Roll No. ${rollNo} not found.`);
  }
}

generateReportCard(201);

// Exercise 2: Filter Students by Subject Marks
function filterStudentsByScienceCutoff(cutoff) {
  return studentData.filter((student) => student.science >= cutoff);
}

console.log(filterStudentsByScienceCutoff(80));

// Exercise 3: Filter Students by Average Marks
function filterStudentsByAverageMarks(avgMarks) {
  return studentData
    .filter((student) => {
      const averageMarks =
        (student.science + student.history + student.geography) / 3;
      return averageMarks >= avgMarks;
    })
    .map((student) => {
      const averageMarks = (
        (student.science + student.history + student.geography) /
        3
      ).toFixed(2);
      return `${student.studentName} has average marks ${averageMarks}`;
    });
}

console.log(filterStudentsByAverageMarks(85).join("\n"));

// Exercise 4: Find Student with Highest Average Marks
function getStudentWithHighestAverageMarks() {
  let highestAverage = 0;
  let topStudent = "";

  studentData.forEach((student) => {
    const averageMarks =
      (student.science + student.history + student.geography) / 3;

    if (averageMarks > highestAverage) {
      highestAverage = averageMarks;
      topStudent = student.studentName;
    } else {
      averageMarks != highestAverage;
      highestAverage;
    }
  });

  console.log(
    `${topStudent} has the highest average marks of ${highestAverage.toFixed(
      2
    )}`
  );
}

getStudentWithHighestAverageMarks();

// Exercise 5: Convert Hours to Minutes
function convertHoursToMinutes(hour) {
  let minutes = hour * 60;
  console.log(`${hour} hours is equal to ${minutes} minutes`);
}

convertHoursToMinutes(2);

// Exercise 6: Count Occurrences of Character in String
function countOccurrences(str, char) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      count++;
    }
  }
  return count;
}

const str = "hello world";
const char = "o";

console.log(
  `Character '${char}' repeats ${countOccurrences(str, char)} times.`
);

// Exercise 7: Find the Sum of All Even Numbers in an Array
function sumOfEvenNumbers(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
      sum = sum + numbers[i];
    }
  }
  return sum;
}

let numbers = [1, 2, 3, 4, 5, 6];

console.log(`The sum of all even numbers is ${sumOfEvenNumbers(numbers)}`);
