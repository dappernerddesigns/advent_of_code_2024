const testMemory =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

//* part one
const memoryRestoration = (memory) => {
  const regex = /mul\(\d{1,3},\d{1,3}\)/g;
  const validSums = memory.match(regex);
  let totalSum = 0;
  validSums.forEach((mul) => {
    const [a, b] = mul.match(/\d+/g);
    const multiple = +a * +b;
    totalSum += multiple;
  });
  return totalSum;
};
const fs = require("fs");
const puzzleInput = fs.readFileSync("./inputs/3.txt", "utf-8");
//* part two

const startStopMemory = (memory) => {
  let start = true;
  let sum = 0;
  const dumps = memory.matchAll(/do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g);
  for (const part of dumps) {
    const command = part[0];

    if (start) {
      if (command === "don't()") {
        start = false;
      } else if (/\d+/g.test(command)) {
        const [a, b] = command.match(/\d+/g);
        const multiple = +a * +b;
        sum += multiple;
      }
    } else if (command === "do()") {
      start = true;
    }
  }
  return sum;
};
