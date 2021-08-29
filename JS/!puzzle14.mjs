import fs from "fs";

function msToKph(ms) {
  return ms * 3.6;
}
function kphToMs(kmh) {
  return kmh / 3.6;
}

const inputFile = fs.readFileSync(
  new URL("../data/2015-puzzle14.txt", import.meta.url),
  "utf8"
);

const inputArray = inputFile.split("\n");
console.log("all instructions:", inputArray.length);

const splitArr = inputArray.map((string) => string.split(" "));

// format: [ Reindeer, speed in km/h , speed in m/s, maximal duration in s, resting time in s ]
const skillArr = splitArr.map((arr) => [
  arr[0],
  parseInt(arr[3]),
  kphToMs(parseInt(arr[3])),
  parseInt(arr[6]),
  parseInt(arr.at(-2)),
]);
// console.log(skillArr);

const sheet = ((skillArr) => {
  let obj = {};
  skillArr.forEach((element) => {
    obj[element[0]] = {};
    obj[element[0]].speedKph = element[1];
    obj[element[0]].speedMs = element[2];
    obj[element[0]].stamina = element[3];
    obj[element[0]].resting = element[4];
    obj[element[0]].distance = 0;
    obj[element[0]].restLeft = 0;
    obj[element[0]].runLeft = element[3];
    obj[element[0]].state = "running";
  });
  return obj;
})(skillArr);

// console.log(sheet);

// after 2503 seconds, what distance has the winning reindeer traveled?
const finish = 2503;

// THE RACE:
const allReindeer = Object.keys(sheet);

for (let s = 0; s <= 2503; s++) {
  for (let reind in sheet) {
    // allReindeer.forEach((reind) => {
    // console.log("test");
    // running state
    if (sheet[reind].state === "running") {
      sheet[reind].distance += sheet[reind].speedMs;
      sheet[reind].runLeft--;
    }
    if (sheet[reind].runLeft === 0) {
      sheet[reind].state = "resting";
      sheet[reind].runLeft = sheet[reind].stamina;
    }
    // resting state
    if (sheet[reind].state === "resting") {
      sheet[reind].restLeft--;
    }
    if (sheet[reind].restLeft === 0) {
      sheet[reind].state = "running";
      sheet[reind].restLeft = sheet[reind].resting;
    }
  }
}

console.log(sheet);
