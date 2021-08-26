import fs from "fs";

const inputFile = fs.readFileSync(
  new URL("./inputFiles/2015-puzzle3.txt", import.meta.url),
  "utf8"
);
console.log(" part 1");
console.log("movement instructions:", inputFile.length);

const inputArray = inputFile.split("");

let allPositions = [[0, 0]]; // declare START POINT
inputArray.forEach((arrow) => {
  let [...nextPosition] = allPositions[allPositions.length - 1]; // get current position
  if (arrow === "^") nextPosition[0]++;
  if (arrow === "v") nextPosition[0]--;
  if (arrow === ">") nextPosition[1]++;
  if (arrow === "<") nextPosition[1]--;
  allPositions.push(nextPosition); // write next position
});

// console.log(allPositions);
console.log("gifts distributed (including start):", allPositions.length);

// find unique locations:
let setBox = new Set();
allPositions.forEach((pos) => {
  setBox.add(`${pos[0]}/${pos[1]}`);
});
console.log("houses with at least 1 present:", setBox.size);

// PART 2:
console.log("\n", "part 2");
const roboInstructions = inputArray.filter((value, index) => index % 2 === 0);
const santaInstructions = inputArray.filter((value, index) => index % 2 !== 0);

console.log("robo-santa instructions:", roboInstructions.length);
console.log("santa instructions:", santaInstructions.length);

let allRoboPositions = [[0, 0]]; // declare START POINT
roboInstructions.forEach((arrow) => {
  let [...nextPosition] = allRoboPositions[allRoboPositions.length - 1];
  if (arrow === "^") nextPosition[0]++;
  if (arrow === "v") nextPosition[0]--;
  if (arrow === ">") nextPosition[1]++;
  if (arrow === "<") nextPosition[1]--;
  allRoboPositions.push(nextPosition);
});

let allSantaPositions = [[0, 0]]; // declare START POINT
santaInstructions.forEach((arrow) => {
  let [...nextPosition] = allSantaPositions[allSantaPositions.length - 1];
  if (arrow === "^") nextPosition[0]++;
  if (arrow === "v") nextPosition[0]--;
  if (arrow === ">") nextPosition[1]++;
  if (arrow === "<") nextPosition[1]--;
  allSantaPositions.push(nextPosition);
});

// find unique locations:
let roboBox = new Set();
allRoboPositions.forEach((pos) => {
  roboBox.add(`${pos[0]}/${pos[1]}`);
});
allSantaPositions.forEach((pos) => {
  roboBox.add(`${pos[0]}/${pos[1]}`);
});
console.log("houses with at least 1 present:", roboBox.size);
