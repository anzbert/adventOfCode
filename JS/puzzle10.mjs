/*
For example:

1 becomes 11 (1 copy of digit 1).
11 becomes 21 (2 copies of digit 1).
21 becomes 1211 (one 2 followed by one 1).
1211 becomes 111221 (one 1, one 2, and two 1s).
111221 becomes 312211 (three 1s, two 2s, and one 1).

Starting with the digits in your puzzle input, apply this process 40 times. What is the length of the result?

Your puzzle input is 1113222113.
*/

const test = "1";
const input = "1113222113";

function next(input = "") {
  //console.log(input)
  if (typeof input !== "string") return false;
  let output = "";

  let inArray = input.match(/(\d)\1*/g);
  inArray.forEach((seq) => {
    //console.log(seq,seq.length,`${seq.length}${seq[0]}`)
    output = output + `${seq.length}${seq[0]}`;
  });

  return output;
}

function repeat(input, times) {
  let temp = input;

  for (let i = times; i > 0; i--) {
    temp = next(temp);
  }
  return temp;
}

const output = repeat(input, 40);

// console.log("output:", output)
console.log("length:", output.length); // 252_594

// PART two:

const output2 = repeat(input, 50);

console.log("length 2:", output2.length); // 3_579_328
