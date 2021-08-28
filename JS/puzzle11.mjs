let input = "hepxcrrq";

let tests = [
  "hijklmmn", // fail
  "abbceffg", // fail
  "abbcegjk", // fail
  "abcdefgh", // -> abcdffaa
  "ghijklmn", // -> ghjaabcc
  "ghjaabca",
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

// i=8 / o=14 / l=11

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

  // TESTS HERE

  return convertToLetters(b26Arr);
}

function noIOL(input) {
  if (input.match(/[iol]/g) !== null) return false;
  // console.log("noIOL");
  return true;
}

function hasDouble(input) {
  let result = input.match(/(\w)\1/g);
  if (result === null || result.length < 2) return false;
  // console.log("hasDouble");
  return true;
}

function hasStraight(input) {
  let b26Arr = convertToB26Arr(input);
  for (let i = 0; i < b26Arr.length - 2; i++) {
    if (
      b26Arr[i + 1] - b26Arr[i] === 1 &&
      b26Arr[i + 2] - b26Arr[i + 1] === 1
    ) {
      // console.log("hasStraight");
      return true;
    }
  }
  return false;
}

// console.log(addOne("aaaaaaaa"));

// result 1: hepxxyzz
let inputQ2 = "hepxxzaa"; // for PART 2

let next = inputQ2;
while (!noIOL(next) || !hasDouble(next) || !hasStraight(next)) {
  console.log(next);
  next = addOne(next);
}
console.log("end Result:", next);
