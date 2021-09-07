import fs from "fs";

const inputFile = fs.readFileSync(
  new URL("../data/2015-puzzle16.txt", import.meta.url),
  "utf8"
);
const inputArray = inputFile.split("\n");
console.log("aunts input:", inputArray.length);

let test = "Sue 1: cars: 9, akitas: 3, goldfish: 0";

const sueRegEx = /Sue (\d+)/;

const attributeRegExObj = {
  children: /children: (\d+)/,
  cats: /cats: (\d+)/,
  samoyeds: /samoyeds: (\d+)/,
  pomeranians: /pomeranians: (\d+)/,
  akitas: /akitas: (\d+)/,
  vizslas: /vizslas: (\d+)/,
  goldfish: /goldfish: (\d+)/,
  trees: /trees: (\d+)/,
  cars: /cars: (\d+)/,
  perfumes: /perfumes: (\d+)/,
};

let aunts = [];
inputArray.forEach((sue) => {
  let matches = {};
  Object.keys(attributeRegExObj).forEach((key) => {
    let match = sue.match(attributeRegExObj[key]);
    if (match) matches[key] = parseInt(match[1]);
  });
  aunts.push(matches);
});

console.log("aunts array of properties:", aunts.length);
console.log(aunts);

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
