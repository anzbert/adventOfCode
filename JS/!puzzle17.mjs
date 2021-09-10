const input = `50
44
11
49
42
46
18
32
26
40
21
7
18
43
10
47
36
24
22
40`;

let inputStrings = input.split("\n");
let containers = inputStrings.map((string) => parseInt(string));
console.log(containers);

const test = [20, 15, 10, 5, 5];
/* Test Solutions : 4
15 and 10
20 and 5 (the first 5)
20 and 5 (the second 5)
15, 5, and 5
*/
