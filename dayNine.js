const mapOne = "2333133121414131402";
const mapTwo = "12345";

// part one
const diskMap = (disk) => {
  const mapped = [];
  let indexId = 0;
  for (let i = 0; i < disk.length; i++) {
    const numNeeded = Number(disk[i]);

    if (i % 2 === 0) {
      for (let i = 0; i < numNeeded; i++) {
        mapped.push(indexId);
      }
      indexId++;
    } else {
      for (let i = 0; i < numNeeded; i++) {
        mapped.push(".");
      }
    }
  }
  return mapped;
};

const defragger = (diskMap) => {
  const indexOfSpaces = [];
  const indexOfFiles = [];
  diskMap.forEach((part, i) => {
    if (part === ".") {
      indexOfSpaces.push(i);
    } else {
      indexOfFiles.unshift(i);
    }
  });
  const defragged = [...diskMap];

  while (indexOfSpaces.length > 0) {
    const currSpace = indexOfSpaces.shift();
    const currDigit = indexOfFiles.shift();
    if (defragged[currSpace] === "." && currSpace < currDigit) {
      defragged[currSpace] = diskMap[currDigit];
      defragged[currDigit] = ".";
    }
  }
  return defragged.filter((part) => part !== ".");
};

// part two
const diskMapper = (disk) => {
  const mapped = [];
  let indexId = 0;
  for (let i = 0; i < disk.length; i++) {
    const numNeeded = Number(disk[i]);

    if (i % 2 === 0) {
      let file = "";
      for (let i = 0; i < numNeeded; i++) {
        file += `${indexId}`;
      }
      if (file.length) {
        mapped.push(file);
      }
      file = "";
      indexId++;
    } else {
      let spaces = "";
      for (let i = 0; i < numNeeded; i++) {
        spaces += ".";
      }
      if (spaces.length) {
        mapped.push(spaces);
      }
      spaces = "";
    }
  }
  return mapped;
};

const defragmentation = (diskMap) => {
  const indexOfSpaces = [];
  const indexOfFiles = [];
  diskMap.forEach((part, i) => {
    if (/\d+/.test(part)) {
      indexOfFiles.unshift(i);
    } else {
      indexOfSpaces.push(i);
    }
  });
  const fragged = [...diskMap];
  console.log(indexOfSpaces, "before move");
  while (indexOfFiles.length) {
    const currDigit = indexOfFiles.shift();
    const sortedSpaces = indexOfSpaces.sort((a, b) => a - b);
    for (let i = 0; i < sortedSpaces.length; i++) {
      if (currDigit > sortedSpaces[i]) {
        if (fragged[currDigit].length <= fragged[sortedSpaces[i]].length) {
          const spacesToAdd =
            fragged[sortedSpaces[i]].length - fragged[currDigit].length;
          const addSpaces = ".".repeat(spacesToAdd);
          const replacementSpaces = ".".repeat(fragged[currDigit].length);
          fragged[sortedSpaces[i]] = fragged[currDigit];
          if (addSpaces.length) {
            fragged[sortedSpaces[i] + 1] = addSpaces;
            indexOfSpaces.push(i + 1);
          }
          fragged[currDigit] = replacementSpaces;
          console.log(indexOfSpaces, "after move");
          console.log(fragged);
          break;
        }
      }
    }
  }
};

const checkSum = (defragged) => {
  let checkSum = 0;
  defragged.forEach((part, i) => {
    const mul = part * i;
    checkSum += mul;
  });
  return checkSum;
};

const { readFileSync } = require("fs");
const puzzleInput = readFileSync("./inputs/09.txt", "utf-8");
const map = diskMap(mapOne);
// const defragged = defragger(map);
// const partOne = checkSum(defragged);
const newMap = diskMapper(mapOne);
defragmentation(newMap);
