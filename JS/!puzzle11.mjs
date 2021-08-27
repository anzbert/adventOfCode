let input = "hepxcrrq";

let tests = [
  "hijklmmn", // fail
  "abbceffg", // fail
  "abbcegjk", // fail
  "abcdefgh", // -> abcdffaa
  "ghijklmn", // -> ghjaabcc
  "ghijklyz",
];

// create BASE 26 number system directory:
function createBase26() {
  let obj = {};
  for (let i = 0; i < 26; i++) {
    let letter = String.fromCharCode(i + 97);
    obj[letter] = i;
  }

  return obj;
}
let base26 = createBase26(); // a=0 -> z=25

function convertToB26Arr(input) {
  const array = input.match(/\w/g);
  return array.map((letter) => base26[letter]);
}

function convertToLetters(input) {
  const letters = input.map((code) => String.fromCharCode(code + 97));
  let stringed = "";
  letters.forEach((letter) => (stringed = stringed + letter));

  return stringed;
}

// ADDING :
function addOne(input) {
  let b26Arr = convertToB26Arr(input);

  b26Arr[7]++;

  for (let i = 7; i > 0; i--) {
    if (b26Arr[i] > 25) {
      b26Arr[i] = 0;
      b26Arr[i - 1]++;
    }
  }

  // TESTS HERE, then recursion

  return convertToLetters(b26Arr);
}

console.log(addOne(tests[5]));

// create password requirement checks:
//////////////////////////////////////////

/*
Unfortunately for Santa, a new Security-Elf recently started, and he has imposed some additional password requirements:

Passwords must include one increasing straight of at least three letters, like abc, bcd, cde, and so on, up to xyz. 
They cannot skip letters; abd doesn't count.

Passwords may not contain the letters i, o, or l, as these letters can be mistaken for other characters and are therefore confusing.

Passwords must contain at least two different, non-overlapping pairs of letters, like aa, bb, or zz.

For example:
============
hijklmmn meets the first requirement (because it contains the straight hij) but fails the second requirement requirement (because it contains i and l).

abbceffg meets the third requirement (because it repeats bb and ff) but fails the first requirement.

abbcegjk fails the third requirement, because it only has one double letter (bb).

The next password after abcdefgh is abcdffaa.

The next password after ghijklmn is ghjaabcc, because you eventually skip all the passwords that start with ghi..., since i is not allowed.

Given Santa's current password (your puzzle input), what should his next password be?
*/
