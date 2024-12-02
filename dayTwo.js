const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

const inputParser = (input) => {
  return input.split("\n").map((level) => {
    const vals = level.split(" ");
    return vals.map(Number);
  });
};

const safeDecrease = (level) => {
  let safe = true;
  for (let i = 0; i < level.length; i++) {
    if (level[i + 1]) {
      const difference = level[i] - level[i + 1];
      if (difference < 1 || difference > 3) {
        safe = false;
        break;
      }
    }
  }
  return safe;
};
const safeIncrease = (level) => {
  let safe = true;
  for (let i = 0; i < level.length; i++) {
    if (level[i + 1]) {
      const difference = level[i + 1] - level[i];
      if (difference < 1 || difference > 3) {
        safe = false;
        break;
      }
    }
  }
  return safe;
};

const problemDampener = (level) => {
  const levels = level.length;
  let safe = false;
  for (let i = 0; i < levels; i++) {
    const levelRemoved = level.toSpliced(i, 1);
    if (safeDecrease(levelRemoved) || safeIncrease(levelRemoved)) {
      safe = true;
      break;
    }
  }
  return safe;
};

const safetyReport = (levels) => {
  let safeCount = 0;
  levels.forEach((level) => {
    if (safeDecrease(level) || safeIncrease(level)) {
      safeCount++;
    } else if (problemDampener(level)) {
      safeCount++;
    }
  });
  return safeCount;
};

const fs = require("fs");
const puzzleInput = fs.readFileSync("./inputs/2.txt", "utf-8");

console.log(safetyReport(inputParser(puzzleInput)));
