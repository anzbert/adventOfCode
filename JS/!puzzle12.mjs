import fs from "fs";

const inputFile = fs.readFileSync(
  new URL("../data/2015-puzzle12.json", import.meta.url),
  "utf8"
);

const inputObject = JSON.parse(inputFile);

console.log(inputObject);
