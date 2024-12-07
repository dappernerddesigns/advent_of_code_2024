const testMap = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;
const parseInput = (input) => {
  const output = {};
  const map = input.split("\n").map((row, i) => {
    if (row.includes("^")) {
      output.startCoordinates = { x: row.indexOf("^") + 1, y: i + 1 };
    }
    const positions = row.split("");
    positions.unshift(0);
    positions.push(0);
    return positions;
  });
  const mapWidth = map[0].length;
  const border = new Array();
  border.length = mapWidth;
  border.fill(0);
  map.push(border);
  map.unshift(border);
  output.map = map;
  return output;
};
class Guard {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.lastX = 0;
    this.lastY = 0;
    this.facing = "^";
    this.directions = {
      "^": () => this.y--,
      ">": () => this.x++,
      v: () => this.y++,
      "<": () => this.x--,
    };
  }
  move() {
    this.lastX = this.x;
    this.lastY = this.y;
    this.directions[this.facing]();
  }
  stepBack() {
    this.x = this.lastX;
    this.y = this.lastY;
  }
  onGrid(map) {
    return (
      this.y >= 0 &&
      this.y < map.length &&
      this.x >= 0 &&
      this.x < map[this.y].length &&
      map[this.y][this.x] !== 0
    );
  }
  turn() {
    const turns = { "^": ">", ">": "v", v: "<", "<": "^" };
    this.facing = turns[this.facing];
  }
  isObstacle(map) {
    return this.onGrid(map) && map[this.y][this.x] === "#";
  }
}

// part one
const guardRoute = (map, guard) => {
  const visited = new Set();
  visited.add(`${guard.y},${guard.x}`);
  while (guard.onGrid(map)) {
    guard.move();
    const row = guard.y;
    const col = guard.x;

    if (guard.onGrid(map) && map[row][col] === "#") {
      guard.stepBack();
      guard.turn();
    } else if (guard.onGrid(map)) {
      visited.add(`${col},${row}`);
    }
  }

  return visited;
};

// part two
const blockTheGuard = (map, guard, locations) => {
  const placesToObstruct = [...locations].map((coords) => {
    const [x, y] = coords.split(",");
    return [+x, +y];
  });

  const validObstructions = [];
  for (let i = 0; i < placesToObstruct.length; i++) {
    const [x, y] = placesToObstruct[i];
    if (x === guard.x && y === guard.y) continue;
    const testGuard = new Guard(guard.x, guard.y);
    if (walkTheMap(map, testGuard, { x, y })) {
      validObstructions.push({ x, y });
    }
  }

  return validObstructions.length;
};

const walkTheMap = (map, guard, obstruction = null) => {
  const visitedWithFacing = new Set();
  let loopDetected = false;

  if (obstruction) map[obstruction.y][obstruction.x] = "#";

  while (guard.onGrid(map)) {
    const state = `${guard.y},${guard.x},${guard.facing}`;
    if (visitedWithFacing.has(state)) {
      loopDetected = true;
      break;
    }
    visitedWithFacing.add(state);
    guard.move();

    if (!guard.onGrid(map)) break;

    if (guard.isObstacle(map)) {
      guard.stepBack();
      guard.turn();
    }
  }

  if (obstruction) map[obstruction.y][obstruction.x] = ".";
  return loopDetected;
};

const fs = require("fs");
const puzzleInput = fs.readFileSync("./inputs/06.txt", "utf-8");
const input = parseInput(puzzleInput);
const guardOne = new Guard(input.startCoordinates.x, input.startCoordinates.y);
const guardTwo = new Guard(input.startCoordinates.x, input.startCoordinates.y);
const partOne = guardRoute(input.map, guardOne);

const visitedLocations = partOne;
const partTwo = blockTheGuard(input.map, guardTwo, visitedLocations);
console.log(partTwo);
