import fs from "fs";

const inputFile = fs.readFileSync(
  new URL("../data/2015-puzzle9.txt", import.meta.url),
  "utf8"
);

let testInput = `London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`;

const trim1 = testInput.replace(/to\s/g, "");
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

// TO OBJ FOR LOOKUPS (like: distance['a']['b'])
let distance = {};
finalArray.forEach((entry) => {
  if (!distance[entry[0]]) {
    distance[entry[0]] = {};
  }
  distance[entry[0]][entry[1]] = entry[2];
});
// console.log(distance);

// LIST OF ALL PLACES:
let allPlaces = Object.keys(distance);
// console.log(allPlaces);

// now find all possible itineraries:
function getRoutes(allPlaces) {
  let toVisit = [...allPlaces];
  while (toVisit.at(-1)) {
    let next = toVisit.at(-1);
    console.log(next);
    toVisit.pop();
  }
}

// console.log(getRoutes(allPlaces));

function left(all, memory) {
  return all.filter((place) => memory.includes(place) === false);
}

function getRoute(all) {
  let memory = [];
  const depth = all.length;
  let route = [];

  // if (left(all, memory).length === 0) {
  //   // if exhausted followable places
  //   route.push(memory); // add route
  //   memory.length = 0; // reset
  // }

  return route;
}
let counter = 0;
let memory = [];

let routes = [];
function deeper(input, passIn = []) {
  if (left(allPlaces, memory).length === 0) {
    console.log(memory, counter++);
    routes.push([...memory]);
    memory.length = 0;
    return;
  }

  input.forEach((place) => {
    memory.push(place);
    deeper(left(allPlaces, memory), memory);
  });
}

deeper(allPlaces);
console.log(routes);

const getDistances = routes.map((route) => {
  let k = 0;
  for (let i = 0; i < route.length - 1; i++) {
    k = k + distance[route[i]][route[i + 1]];
  }
  return k;
});
console.log(getDistances);
