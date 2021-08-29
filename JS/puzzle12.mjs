import fs from "fs";

const inputFile = fs.readFileSync(
  new URL("../data/2015-puzzle12.json", import.meta.url),
  "utf8"
);

const numbers = inputFile.match(/-*\d+/g);

const parsed = numbers.map((string) => parseInt(string));

const result = parsed.reduce((acc, current) => acc + current);
console.log("PART ONE:", result);
// RESULT 1 = 111754

// -------------------------------------------------------------
// PART TWO:

/*
Ignore any object (and all of its children) which has any property with the value "red". Do this only for objects ({...}), not arrays ([...]).

    [1,2,3] still has a sum of 6.
    [1,{"c":"red","b":2},3] now has a sum of 4, because the middle object is ignored.
    {"d":"red","e":[1,2,3,4],"f":5} now has a sum of 0, because the entire structure is ignored.
    [1,"red",5] has a sum of 6, because "red" in an array has no effect.
*/

const inputObject = JSON.parse(inputFile);
let counter = 0;

function checkArray(input) {
  input.forEach((value) => {
    if (typeof value === "number") {
      console.log("true");
      counter = counter + value;
    }
    if (checkType(value) === "obj") checkObject(value);
    if (checkType(value) === "arr") checkArray(value);
  });
}

function checkObject(input) {
  let values = Object.values(input);

  if (Object.values(input).includes("red")) {
    console.log("red found");
    return;
  }

  values.forEach((value) => {
    if (typeof value === "number") counter = counter + value;
    if (checkType(value) === "obj") checkObject(value);
    if (checkType(value) === "arr") checkArray(value);
  });
}

function checkType(input) {
  if (typeof input === "object" && Array.isArray(input)) return "arr";
  else if (typeof input === "object" && !Array.isArray(input)) return "obj";
  return false;
}

checkObject(inputObject);
console.log("\nResult TWO:", counter);
