import fs from "fs";
import process from "process";

const inputFile = fs.readFileSync(
  new URL("../data/2015-puzzle7.txt", import.meta.url),
  "utf8"
);

const inputArray = inputFile.split("\n");
console.log("all instructions:", inputArray.length);

const testInputArray = [
  "123 -> x",
  "456 -> y",
  "x AND y -> d",
  "x OR y -> e",
  "x LSHIFT 2 -> f",
  "y RSHIFT 2 -> g",
  "NOT x -> h",
  "NOT y -> i",
  "x -> j",
];

function uint16(n) {
  return n & 0xffff;
}

function addVars(instructions, obj) {
  instructions.forEach((inst) => {
    let vars = inst.match(/[a-z]+/g);
    vars.forEach((element) => {
      obj[element] = null;
    });
  });
}

const instructionArray = inputArray.map((string) => string.split(" "));
const parsedInstructionArray = instructionArray.map((array) => {
  const parsedNumbers = array.map((content) => {
    if (content.match(/\d+/)) return parseInt(content);
    return content;
  });
  return parsedNumbers;
});

let circuit = {};
addVars(inputArray, circuit);
// circuit.a = 1;
// console.log(circuit);

let counter = 0;

while (circuit.a === null) {
  console.log(circuit);
  parsedInstructionArray.forEach((instruction) => {
    if (typeof instruction[0] === "number")
      circuit[instruction[2]] = instruction[0];

    if (typeof instruction[0] === "string" && instruction.length === 3)
      if (circuit[instruction[0]])
        circuit[instruction[2]] = circuit[instruction[0]];

    if (instruction[0] === "NOT")
      if (circuit[instruction[1]])
        circuit[instruction[3]] = uint16(~circuit[instruction[1]]);

    if (instruction[1] === "AND")
      if (circuit[instruction[0]] && circuit[instruction[2]])
        circuit[instruction[4]] =
          circuit[instruction[0]] & circuit[instruction[2]];

    if (instruction[1] === "OR")
      if (circuit[instruction[0]] && circuit[instruction[2]])
        circuit[instruction[4]] =
          circuit[instruction[0]] | circuit[instruction[2]];

    if (instruction[1] === "LSHIFT")
      if (circuit[instruction[0]])
        circuit[instruction[4]] = circuit[instruction[0]] << instruction[2];

    if (instruction[1] === "RSHIFT")
      if (circuit[instruction[0]])
        circuit[instruction[4]] = circuit[instruction[0]] >> instruction[2];
  });
}
// console.log(instructionArray);
// console.log(parsedInstructionArray);

// let circuit = addVars(testInputArray);
console.log(circuit);
console.log("a:", circuit.a);

/*
For example:
    123 -> x means that the signal 123 is provided to wire x.
    x AND y -> z means that the bitwise AND of wire x and wire y is provided to wire z.
    p LSHIFT 2 -> q means that the value from wire p is left-shifted by 2 and then provided to wire q.
    NOT e -> f means that the bitwise complement of the value from wire e is provided to wire f.

TEST INPUT RESULT:
  d: 72
  e: 507
  f: 492
  g: 114
  h: 65412
  i: 65079
  x: 123
  y: 456
*/
