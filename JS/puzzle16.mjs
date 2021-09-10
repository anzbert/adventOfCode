import fs from "fs";

const inputFile = fs.readFileSync(
  new URL("../data/2015-puzzle16.txt", import.meta.url),
  "utf8"
);
const inputArray = inputFile.split("\n");
// console.log("aunts input:", inputArray.length);

let test = "Sue 1: cars: 9, akitas: 3, goldfish: 0";

// CLUE:
let clue = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

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

console.log(
  "aunts is an array of objects with their properties:",
  aunts.length
);

aunts.forEach((aunt, index) => {
  let matches = Object.keys(aunt).filter((key) => clue[key] === aunt[key]);
  if (matches.length === Object.keys(aunt).length) {
    console.log("aunt number part one:", index + 1);
  }
});

// RESULT PART ONE: 373

// PART TWO:
// CLUES:
const reEqual = {
  children: 3,
  samoyeds: 2,
  akitas: 0,
  vizslas: 0,
  cars: 2,
  perfumes: 1,
};

const reMore = {
  cats: 7,
  trees: 3,
};

const reLess = {
  pomeranians: 3,
  goldfish: 5,
};

let indexedAunts = aunts.map((aunt, index) => {
  aunt.sueNumber = index + 1;
  return aunt;
});

let equalAunts = indexedAunts.filter((aunt) => {
  for (let key in aunt) {
    if (aunt[key] !== reEqual[key] && reEqual[key] !== undefined) return false;
  }
  return true;
});

let lessAunts = equalAunts.filter((aunt) => {
  for (let key in aunt) {
    if (aunt[key] >= reLess[key] && reLess[key] !== undefined) return false;
  }
  return true;
});

let moreAunts = lessAunts.filter((aunt) => {
  for (let key in aunt) {
    if (aunt[key] <= reMore[key] && reMore[key] !== undefined) return false;
  }
  return true;
});

console.log("part 2:", moreAunts);
