const testInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;
const inputParser = (input) => {
  return input.split("\n").map((row) => row.split(""));
};

function extractWindows(array, windowRows, windowCols) {
  const result = [];
  const numRows = array.length;
  const numCols = array[0]?.length || 0;

  if (numRows < windowRows || numCols < windowCols) {
    return result;
  }

  for (let row = 0; row <= numRows - windowRows; row++) {
    for (let col = 0; col <= numCols - windowCols; col++) {
      const window = [];
      for (let i = 0; i < windowRows; i++) {
        window.push(array[row + i].slice(col, col + windowCols));
      }
      result.push(window);
    }
  }

  return result;
}

function countXmasOccurrences(grid, word = "XMAS") {
  const rows = grid.length;
  const cols = grid[0].length;
  const wordLength = word.length;

  // Define all 8 directions
  const directions = [
    [0, 1], // Right
    [0, -1], // Left
    [1, 0], // Down
    [-1, 0], // Up
    [1, 1], // Down-right
    [-1, -1], // Up-left
    [1, -1], // Down-left
    [-1, 1], // Up-right
  ];

  function isWithinBounds(r, c) {
    return r >= 0 && r < rows && c >= 0 && c < cols;
  }

  function checkDirection(r, c, dr, dc) {
    for (let i = 0; i < wordLength; i++) {
      const nr = r + dr * i;
      const nc = c + dc * i;
      if (!isWithinBounds(nr, nc) || grid[nr][nc] !== word[i]) {
        return false;
      }
    }
    return true;
  }

  let count = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      for (const [dr, dc] of directions) {
        if (checkDirection(r, c, dr, dc)) {
          count++;
        }
      }
    }
  }

  return count;
}

const xmasSearch = (grid) => {
  let found = 0;
  const validXmas = ["MAS", "SAM"];
  for (let i = 0; i < grid.length; i++) {
    const topLeft = grid[i][0][0];
    const topRight = grid[i][0][2];
    const middle = grid[i][1][1];
    const bottomLeft = grid[i][2][0];
    const bottomRight = grid[i][2][2];
    const masOne = `${topLeft}${middle}${bottomRight}`;
    const masTwo = `${topRight}${middle}${bottomLeft}`;
    if (validXmas.includes(masOne) && validXmas.includes(masTwo)) found++;
  }
  return found;
};
const fs = require("fs");
const puzzleInput = fs.readFileSync("./inputs/4.txt", "utf-8");
const windows = extractWindows(inputParser(puzzleInput), 4, 4);
console.log(wordSearch(windows));
