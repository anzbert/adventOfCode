import fs from "fs";

const inputFile = fs.readFileSync(
  new URL("./inputFiles/2015-puzzle6.txt", import.meta.url),
  "utf8"
);

const inputArray = inputFile.split("\n");
console.log("all instructions:", inputArray.length);

// parse instructions:
const cleanedStrings = inputArray.map((string) => {
  let newString1 = string.replace("turn ", "");
  let newString2 = newString1.replace(/,/g, " ");
  let newString3 = newString2.replace(" through ", " ");
  return newString3;
});

const splitStrings = cleanedStrings.map((string) => string.split(" "));
const parsedInstructions = splitStrings.map((instruction) => {
  return [
    instruction[0],
    parseInt(instruction[1]),
    parseInt(instruction[2]),
    parseInt(instruction[3]),
    parseInt(instruction[4]),
  ];
});

console.log(
  "formatted instruction example:",
  parsedInstructions[parsedInstructions.length - 1]
);

// create matrix of 1000x1000:
function create2dArray(x, y) {
  let output = [];
  for (let i = 0; i < x; i++) {
    output[i] = [];
    for (let j = 0; j < y; j++) {
      output[i][j] = 0;
    }
  }
  return output;
}
const testMatrix = create2dArray(5, 5);
const matrix = create2dArray(1000, 1000);

//a coordinate pair like 0,0 through 2,2 therefore refers to 9 lights in a 3x3 square.
function manipulate(matrix, fn, x1, y1, x2, y2) {
  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      if (fn === "on") matrix[x][y] = 1;
      else if (fn === "off") matrix[x][y] = 0;
      else if (fn === "toggle") matrix[x][y] = matrix[x][y] === 0 ? 1 : 0;
      else console.error("unknown manipulation method");
    }
  }
}

parsedInstructions.forEach((instruction) => {
  manipulate(
    matrix,
    instruction[0],
    instruction[1],
    instruction[2],
    instruction[3],
    instruction[4]
  );
});

let counter = 0;
matrix.forEach((x) => {
  x.forEach((y) => {
    if (y === 1) counter++;
  });
});

console.log("lights on:", counter);
//////////////////////////////////////////
// PART 2
const matrix2 = create2dArray(1000, 1000);

function manipulate2(matrix, fn, x1, y1, x2, y2) {
  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      if (fn === "on") matrix[x][y]++;
      else if (fn === "off" && matrix[x][y] >= 1) matrix[x][y]--;
      else if (fn === "toggle") matrix[x][y] = matrix[x][y] + 2;
    }
  }
}
parsedInstructions.forEach((instruction) => {
  manipulate2(
    matrix2,
    instruction[0],
    instruction[1],
    instruction[2],
    instruction[3],
    instruction[4]
  );
});

let counter2 = 0;
matrix2.forEach((x) => {
  x.forEach((y) => {
    counter2 = counter2 + y;
  });
});

console.log("brightness (PART 2):", counter2);
