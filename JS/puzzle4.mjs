import crypto from "crypto";

const testKey = "pqrstuv"; // result should be 1048970
const secretKey = "iwrupvqb";

function testFiveZeros(input) {
  if (input.length < 5) return false;
  for (let i = 0; i < 5; i++) {
    if (input[i] !== "0") {
      return false;
    }
  }
  return true;
}

const md5 = (x) => crypto.createHash("md5").update(x, "utf8").digest("hex");

for (let i = 0; i < 10_000_000; i++) {
  if (testFiveZeros(md5(`${testKey}${i}`))) {
    console.log(`${testKey}${i}`);
    break;
  }
}

for (let i = 0; i < 10_000_000; i++) {
  if (testFiveZeros(md5(`${secretKey}${i}`))) {
    console.log(`${secretKey}${i}`);
    console.log("answer is:", i);
    break;
  }
}

// part 2:
function testSixZeros(input) {
  if (input.length < 6) return false;
  for (let i = 0; i < 6; i++) {
    if (input[i] !== "0") {
      return false;
    }
  }
  return true;
}

for (let i = 0; i < 10_000_000; i++) {
  if (testSixZeros(md5(`${secretKey}${i}`))) {
    console.log(`${secretKey}${i}`);
    console.log("answer is:", i);
    break;
  }
}
