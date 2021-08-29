import fs from "fs";

const inputFile = fs.readFileSync(
  new URL("../data/2015-puzzle13.txt", import.meta.url),
  "utf8"
);
const inputArray = inputFile.split("\n");
console.log("Instructions:", inputArray.length);
