import fs from "fs";

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
  "1 OR y -> k",
  "x AND 1 -> l",
  "NOT 5 -> h",
];

const instructionArray = inputArray.map((string) => string.split(" "));

const parsedInstructionArray = instructionArray.map((array) => {
  const parsedNumbers = array.map((content) => {
    if (content.match(/\d+/)) return parseInt(content);
    return content;
  });
  return parsedNumbers;
});
console.log(parsedInstructionArray);

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

function getNumber(instr, circ) {
  let a = typeof instr[0] === "number" ? instr[0] : circ[instr[0]];
  let b = typeof instr[2] === "number" ? instr[2] : circ[instr[2]];
  if (typeof a === "number" && typeof b === "number") return [a, b];
  return false;
}

let circuit = {};
addVars(inputArray, circuit);

while (circuit.a === null) {
  console.log(circuit);
  parsedInstructionArray.forEach((instruction) => {
    let components = getNumber(instruction, circuit);

    // assignment
    if (typeof instruction[0] === "number" && instruction[1] === "->") {
      circuit[instruction[2]] = instruction[0];
    } else if (instruction[1] === "->")
      if (circuit[instruction[0]])
        circuit[instruction[2]] = circuit[instruction[0]];

    // NOT
    if (instruction[0] === "NOT")
      if (instruction[1] === "number") {
        circuit[instruction[3]] = uint16(~circuit[instruction[1]]);
      } else if (circuit[instruction[1]]) {
        circuit[instruction[3]] = uint16(~circuit[instruction[1]]);
      }

    // OTHER
    if (components !== false) {
      if (instruction[1] === "AND")
        circuit[instruction.at(-1)] = components[0] & components[1];
      if (instruction[1] === "OR")
        circuit[instruction.at(-1)] = components[0] | components[1];
      if (instruction[1] === "LSHIFT")
        circuit[instruction.at(-1)] = components[0] << components[1];
      if (instruction[1] === "RSHIFT")
        circuit[instruction.at(-1)] = components[0] >> components[1];
    }
    // ---------------------------
    // PART TWO:
    if (circuit.b !== 16076) circuit.b = 16076;
    // ---------------------------
  });
}

console.log(circuit);
console.log("result:", circuit.a);
// result part 1: 16076
// part two : 2797
