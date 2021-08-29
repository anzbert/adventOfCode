import fs from "fs";

const inputFile = fs.readFileSync(
  new URL("../data/2015-puzzle14.txt", import.meta.url),
  "utf8"
);

const test = `Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.`;

const inputArray = inputFile.split("\n");
console.log("all instructions:", inputArray.length);

const splitArr = inputArray.map((string) => string.split(" "));

// format: [ Reindeer, speed in km/s, maximal duration in s, resting time in s ]
const skillArr = splitArr.map((arr) => [
  arr[0],
  parseInt(arr[3]),
  parseInt(arr[6]),
  parseInt(arr.at(-2)),
]);
// console.log(skillArr);

let sheet = ((skillArr) => {
  let obj = {};
  skillArr.forEach((element) => {
    obj[element[0]] = {};
    obj[element[0]].speedKps = element[1];
    obj[element[0]].stamina = element[2];
    obj[element[0]].resting = element[3];
    obj[element[0]].distance = 0;
    obj[element[0]].restLeft = element[3];
    obj[element[0]].runLeft = element[2];
    obj[element[0]].state = "running";
    // for part 2:
    obj[element[0]].points = 0;
  });
  return obj;
})(skillArr);

// console.log(sheet);

// THE RACE:
for (let s = 0; s < 2503; s++) {
  let distMem = [];
  for (let reind in sheet) {
    // run / rest:
    if (sheet[reind].state === "running") {
      sheet[reind].distance += sheet[reind].speedKps;
      sheet[reind].runLeft--;
    }
    if (sheet[reind].state === "resting") {
      sheet[reind].restLeft--;
    }
    // change states:
    if (sheet[reind].restLeft === 0) {
      sheet[reind].state = "running";
      sheet[reind].runLeft = sheet[reind].stamina;
      sheet[reind].restLeft = sheet[reind].resting;
    }
    if (sheet[reind].runLeft === 0) {
      sheet[reind].state = "resting";
      sheet[reind].runLeft = sheet[reind].stamina;
      sheet[reind].restLeft = sheet[reind].resting;
    }
    // find longest distance:
    distMem.push(sheet[reind].distance);
    distMem.sort((a, b) => b - a);
  }
  for (let reind in sheet) {
    if (sheet[reind].distance === distMem[0]) sheet[reind].points++;
  }
  distMem.length = 0;
}

// using test data:
// console.log("comet:", sheet.Comet.distance); // 1120km after 1000s
// console.log("dancer:", sheet.Dancer.distance); // 1120km after 1000s

function getDistances(sheet) {
  let d = [];
  let p = [];
  for (let reind in sheet) {
    d.push(sheet[reind].distance);
    p.push(sheet[reind].points);
  }
  d.sort((a, b) => b - a);
  p.sort((a, b) => b - a);
  return [d, p];
}

console.log("furthest distance:", getDistances(sheet)[0][0]);
console.log("most points:", getDistances(sheet)[1][0]);
// RESULT 1: 2660
// RESULT 2: 1256
