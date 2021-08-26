import fs from "fs";

const inputFile = fs.readFileSync(
  new URL("./inputFiles/2015-puzzle2.txt", import.meta.url),
  "utf8"
);
const inputArray = inputFile.split("\n");

const sizesArray = inputArray.map((lengthWidthHeight) => {
  return lengthWidthHeight.split("x");
});

const allPackagesArray = sizesArray.map((gift) => {
  let length = gift[0];
  let width = gift[1];
  let height = gift[2];

  let surfaces = [length * width, length * height, width * height];
  surfaces.sort((a, b) => a - b);

  return (
    2 * length * width + 2 * length * height + 2 * width * height + surfaces[0]
  );
});

const wrappingPaperTotal = allPackagesArray.reduce((acc, current) => {
  return acc + current;
});

console.log("items:", inputArray.length);
console.log("paper needed:", wrappingPaperTotal, "sq ft");

// part 2:
const ribbonArray = sizesArray.map((gift) => {
  let length = gift[0];
  let width = gift[1];
  let height = gift[2];

  gift.sort((a, b) => a - b);

  return 2 * gift[0] + 2 * gift[1] + length * width * height;
});

const ribbonTotal = ribbonArray.reduce((acc, current) => {
  return acc + current;
});

console.log("ribbon needed:", ribbonTotal, "ft");
