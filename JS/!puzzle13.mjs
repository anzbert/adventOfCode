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
David would gain 41 happiness units by sitting next to Carol.`; // 12 instructions

/* EXAMPLE RESULTS:
     +41 +46
+55   David    -2
Carol       Alice
+60    Bob    +54
     -7  +83
*/

const inputArr = inputFile.split("\n");
const testArr = exampleData.split("\n");
console.log("Instructions:", testArr.length);
