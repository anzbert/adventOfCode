import fs from "fs";

const inputFile = fs.readFileSync(
  new URL("../data/2015-puzzle16.txt", import.meta.url),
  "utf8"
);
const inputArray = inputFile.split("\n");
console.log("aunts:", inputArray.length);

/*
CLUE:

children: 3
cats: 7
samoyeds: 2
pomeranians: 3
akitas: 0
vizslas: 0
goldfish: 5
trees: 3
cars: 2
perfumes: 1
*/
