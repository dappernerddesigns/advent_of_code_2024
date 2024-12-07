const testInput = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

const parseInput = (input) => {
  return input.split("\n").map((sum) => {
    const [target, values] = sum.split(": ");
    const numValues = values.split(" ").map(Number);
    return [+target, ...numValues];
  });
};

const validEquations = (equations) => {
  let valid = 0;
  equations.forEach((equation) => {
    const target = equation.shift();
    const possibleSums = treeSums(equation, target);
    if (possibleSums.includes(target)) {
      valid += target;
    }
  });
  return valid;
};

const treeSums = (values, target) => {
  const results = [];
  if (values.length < 2) {
    return values[0];
  }
  const first = values.shift();
  const second = values.shift();
  const concat = Number(`${first}${second}`);

  if (first + second <= target) {
    results.push(treeSums([first + second, ...values], target));
  }
  if (first * second <= target) {
    results.push(treeSums([first * second, ...values], target));
  }
  if (concat <= target) {
    results.push(treeSums([concat, ...values], target));
  }
  return results.flat();
};

const fs = require("fs");
const inputData = fs.readFileSync("./inputs/07.txt", "utf-8");
const puzzleInput = parseInput(inputData);
console.log(validEquations(puzzleInput));
