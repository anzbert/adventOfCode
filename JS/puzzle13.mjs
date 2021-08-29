import fs from "fs";

const inputFile = fs.readFileSync(
  new URL("../data/2015-puzzle13.txt", import.meta.url),
  "utf8"
); // 56 instructions

const exampleData = `Alice would gain 54 happiness units by sitting next to Bob.
Alice would lose 79 happiness units by sitting next to Carol.
Alice would lose 2 happiness units by sitting next to David.
Bob would gain 83 happiness units by sitting next to Alice.
Bob would lose 7 happiness units by sitting next to Carol.
Bob would lose 63 happiness units by sitting next to David.
Carol would lose 62 happiness units by sitting next to Alice.
Carol would gain 60 happiness units by sitting next to Bob.
Carol would gain 55 happiness units by sitting next to David.
David would gain 46 happiness units by sitting next to Alice.
David would lose 7 happiness units by sitting next to Bob.
David would gain 41 happiness units by sitting next to Carol`; // 12 instructions

/* EXAMPLE RESULTS:

     +41 +46
+55   David    -2
Carol       Alice
+60    Bob    +54
     -7  +83

RESULT TOTAL= 330
*/

const inputArr = inputFile.split(".\n");
const testArr = exampleData.split(".\n");
// console.log("Instructions:", testArr);

const splitArr = inputArr.map((string) => string.split(" "));
const cleanedArr = splitArr.map((arr) => [
  arr[0],
  arr[2] === "gain" ? parseInt(arr[3]) : parseInt(arr[3]) * -1,
  arr.at(-1),
]);
// console.log(cleanedArr);

// TO AN OBJ FOR LOOKUPS (like: happiness['a']['b'])
function arrayToObj(array) {
  let happiness = {};
  array.forEach((entry) => {
    if (!happiness[entry[0]]) {
      happiness[entry[0]] = {};
    }
    happiness[entry[0]][entry[2]] = entry[1];
  });
  return happiness;
}
// -------------------------------
// PART ONE:
// const relationships = arrayToObj(cleanedArr);

// PART TWO:
const relationships = arrayToObjWithYourself(cleanedArr);
// console.log(relationships);

// add yourself:
function arrayToObjWithYourself(array) {
  let happiness = {};
  happiness.you = {};

  array.forEach((entry) => {
    if (!happiness[entry[0]]) {
      happiness[entry[0]] = {};
    }
    happiness[entry[0]][entry[2]] = entry[1];
    happiness[entry[0]]["you"] = 0;
    happiness["you"][entry[0]] = 0;
  });

  return happiness;
}

// -------------------------------
// LIST OF ALL PLACES:
const allPeople = Object.keys(relationships);
// console.log(allPeople);

// THIS IS THE RECURSION BIT:
function left(all, memory) {
  return all.filter((person) => memory.includes(person) === false);
}

function deeper(input, passIn = []) {
  if (left(allPeople, passIn).length === 0) {
    combinations.push([...passIn, passIn[0]]); // add first one again, since table is round
    return;
  }

  input.forEach((person) => {
    let soFar = [...passIn, person];
    deeper(left(allPeople, soFar), soFar);
  });
}

let combinations = [];
deeper(allPeople);
// console.log("all combinations:", combinations);

// PHEW.... now finally get all distances in an array:
const getHappiness = combinations.map((combo) => {
  let total = 0;
  for (let i = 0; i < combo.length - 1; i++) {
    total = total + relationships[combo[i]][combo[i + 1]];
    total = total + relationships[combo[i + 1]][combo[i]];
  }
  return total;
});

getHappiness.sort((a, b) => b - a);
console.log("Highest possible happiness:", getHappiness[0]);
