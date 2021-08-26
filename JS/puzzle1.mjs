import fs from "fs";

const inputFile = fs.readFileSync(
  new URL("./inputFiles/2015-puzzle1.txt", import.meta.url),
  "utf8"
);
const inputArray = inputFile.split("");
console.log("total stairs:", inputArray.length);

const numberArray = inputArray.map((element) => {
  if (element === "(") return 1;
  if (element === ")") return -1;
});

const finalFloor = numberArray.reduce((acc, current) => {
  return acc + current;
});

console.log("final floor:", finalFloor);

// 2nd question:
const enterBasement = numberArray.reduce((acc, current, index) => {
  let entered = false;
  if (acc === -1) {
    console.log("entering basement at:", index);
    entered = true;
  }
  if (entered) return index;
  return acc + current;
});
