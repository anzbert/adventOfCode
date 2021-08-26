import fs from "fs";

const inputFile = fs.readFileSync(
  new URL("./inputFiles/2015-puzzle5.txt", import.meta.url),
  "utf8"
);

const inputArray = inputFile.split("\n");
console.log("strings to be tested:", inputArray.length);

/*
A nice string is one with all of the following properties:

   - It contains at least three vowels (aeiou only), like aei, xazegov, or aeiouaeiouaeiou.
    
   - It contains at least one letter that appears twice in a row, like xx, abcdde (dd), 
        or aabbccdd (aa, bb, cc, or dd).
        
   - It does not contain the strings ab, cd, pq, or xy, 
        even if they are part of one of the other requirements.

How many strings are nice?
*/

const testArray = [
  "ugknbfddgicrmopn",
  "jchzalrnumimnmhp",
  "haegwjzuvuyypxyu",
  "dvszwmarrgswjxmb",
  "aaa",
];

const cond2 = /(\w)\1/g;
const includesDouble = inputArray.filter((string) => {
  if (string.match(cond2) !== null) return true;
  return false;
});

const cond3 = /[aeiou]/g;
const count3Vowels = includesDouble.filter((string) => {
  let matching = string.match(cond3) ?? ["-"];
  if (matching.length < 3) return false;
  return true;
});

const cond1 = /ab|cd|pq|xy/g;
const noBadCombination = count3Vowels.filter((string) => {
  if (string.match(cond1) !== null) return false;
  return true;
});

console.log("nice strings:", noBadCombination.length);

// PART 2
/* 
 new rules:
- It contains a pair of any two letters that appears at least twice in the string 
  without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps).

- It contains at least one letter which repeats with exactly one letter between them, 
  like xyx, abcdefeghi (efe), or even aaa.
*/

let testArray2 = [
  "qjhvhtzxzqqjkmpb", // nice
  "xxyxx", // nice
  "uurcxstgmygtbstg", //naughty
  "ieodomkazucvgmuy", // naughty
];

let part2Cond1 = /(\w\w)\w*\1/;
const repeatingPattern = inputArray.filter((string) => {
  if (string.match(part2Cond1) !== null) return true;
  return false;
});

let part2Cond2 = /(\w)\w\1/;
const sandwichedLetters = repeatingPattern.filter((string) => {
  if (string.match(part2Cond2) !== null) return true;
  return false;
});

console.log("part2:", sandwichedLetters.length);
