import fs from "fs";

const input = fs.readFileSync(
  new URL("../data/2015-puzzle9.txt", import.meta.url),
  "utf8"
);

let testInput = `London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`;

const trim1 = input.replace(/to\s/g, "");
const trim2 = trim1.replace(/=\s/g, "");
const inputToArray = trim2.split("\n");

const toNestedArrays = inputToArray.map((entry) => entry.split(" "));
const parseDistance = toNestedArrays.map((entry) => [
  entry[0],
  entry[1],
  parseInt(entry[2]),
]);

const finalArray = [
  ...parseDistance,
  ...parseDistance.map((entry) => [entry[1], entry[0], entry[2]]),
];
// console.log(finalArray);

// TO AN OBJ FOR LOOKUPS (like: distance['a']['b'])
let distance = {};
finalArray.forEach((entry) => {
  if (!distance[entry[0]]) {
    distance[entry[0]] = {};
  }
  distance[entry[0]][entry[1]] = entry[2];
});
// console.log(distance);

// LIST OF ALL PLACES:
const allPlaces = Object.keys(distance);
// console.log(allPlaces);

// THIS IS THE CRUCIAL RECURSION BIT:
function left(all, memory) {
  return all.filter((place) => memory.includes(place) === false);
}

function deeper(input, passIn = []) {
  if (left(allPlaces, passIn).length === 0) {
    routes.push([...passIn]);
    return;
  }

  input.forEach((place) => {
    let soFar = [...passIn, place];
    deeper(left(allPlaces, soFar), soFar);
  });
}

let routes = [];
deeper(allPlaces);
console.log("all routes:", routes);

// PHEW.... now finally get all distances in an array:
const getDistances = routes.map((route) => {
  let k = 0;
  for (let i = 0; i < route.length - 1; i++) {
    k = k + distance[route[i]][route[i + 1]];
  }
  return k;
});

getDistances.sort((a, b) => a - b);
console.log("shortest route:", getDistances[0]);

// PART TWO:
console.log("longest route:", getDistances.at(-1));
