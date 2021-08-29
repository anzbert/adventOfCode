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
const cleanedArr = splitArr.map((arr) => [
  arr[0],
  parseInt(arr[3]),
  kphToMs(parseInt(arr[3])),
  parseInt(arr[6]),
  parseInt(arr.at(-2)),
]);
console.log(cleanedArr);

// after 2503 seconds, what distance has the winning reindeer traveled?
const finish = 2503;
