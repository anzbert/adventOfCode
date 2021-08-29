import fs from "fs";

const inputFile = fs.readFileSync(
  new URL("../data/2015-puzzle14.txt", import.meta.url),
  "utf8"
);

const inputArray = inputFile.split("\n");
console.log("all instructions:", inputArray.length);

const splitArr = inputArray.map((string) => string.split(" "));

// format: [ Reindeer, speed in km/h , maximal duration in s, resting time in s ]
const cleanedArr = splitArr.map((arr) => [
  arr[0],
  parseInt(arr[3]),
  parseInt(arr[6]),
  parseInt(arr.at(-2)),
]);
console.log(cleanedArr);

// after 2503 seconds, what distance has the winning reindeer traveled?
const finish = 2503;
