// const { map, map2, map3 } = require("./inputs/day8test");
const testMap = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;
const findAntennas = (input) => {
  const rows = input.split("\n");
  const antenna = {};

  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      if (row[x] !== ".") {
        if (row[x] in antenna) {
          const currCoords = antenna[row[x]];
          const currLocation = { x, y };
          antenna[row[x]] = [...currCoords, currLocation];
        } else {
          antenna[row[x]] = [{ x, y }];
        }
      }
    }
  });
  const boundary = { x: rows[0].length - 1, y: rows.length - 1 };
  return { antenna, boundary };
};

// part one
const placeAntinodes = ({ antenna, boundary }) => {
  const uniqueLocations = new Set();

  for (const freq in antenna) {
    const coords = antenna[freq];
    for (let i = 0; i < coords.length; i++) {
      for (let j = i + 1; j < coords.length; j++) {
        const A = coords[i];
        const B = coords[j];

        const deltaX = B.x - A.x;
        const deltaY = B.y - A.y;

        const C1 = { x: A.x + 2 * deltaX, y: A.y + 2 * deltaY };
        const C2 = { x: B.x - 2 * deltaX, y: B.y - 2 * deltaY };

        if (inBoundary(boundary, C1)) {
          uniqueLocations.add(`${C1.x},${C1.y}`);
        }
        if (inBoundary(boundary, C2)) {
          uniqueLocations.add(`${C2.x},${C2.y}`);
        }
      }
    }
  }
  return uniqueLocations.size;
};

// part two
const placeAntinodesPartTwo = ({ antenna, boundary }) => {
  const uniqueLocations = new Set();

  for (const freq in antenna) {
    const coords = antenna[freq];

    // Add all antenna positions to the set if there are at least two antennas
    if (coords.length > 1) {
      coords.forEach(({ x, y }) => {
        uniqueLocations.add(`${x},${y}`);
      });
    }

    // Trace lines between all pairs of antennas
    for (let i = 0; i < coords.length; i++) {
      for (let j = i + 1; j < coords.length; j++) {
        const points = bresenhamLine(
          coords[i].x,
          coords[i].y,
          coords[j].x,
          coords[j].y,
          boundary
        );
        points.forEach((point) => {
          uniqueLocations.add(point);
        });
      }
    }
  }

  // Return the number of unique locations with antinodes
  console.log(uniqueLocations.size);
  return uniqueLocations.size;
};

const inBoundary = (boundary, coord) => {
  return (
    coord.x <= boundary.x &&
    coord.y <= boundary.y &&
    coord.x >= 0 &&
    coord.y >= 0
  );
};

const bresenhamLine = (x1, y1, x2, y2, boundary) => {
  const points = new Set();

  // Calculate deltas and step directions
  const dx = x2 - x1;
  const dy = y2 - y1;

  // Normalize the slope (dx, dy)
  const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));
  const divisor = gcd(dx, dy);
  const stepX = dx / divisor;
  const stepY = dy / divisor;

  // Trace backward to the edge
  let currentX = x1,
    currentY = y1;
  while (inBoundary(boundary, { x: currentX, y: currentY })) {
    points.add(`${currentX},${currentY}`);
    currentX -= stepX;
    currentY -= stepY;
  }

  // Trace forward to the edge
  currentX = x1 + stepX;
  currentY = y1 + stepY;
  while (inBoundary(boundary, { x: currentX, y: currentY })) {
    points.add(`${currentX},${currentY}`);
    currentX += stepX;
    currentY += stepY;
  }

  return points;
};

const { readFileSync } = require("fs");
const puzzleMap = readFileSync("./inputs/08.txt", "utf-8");
const antennaLocations = findAntennas(puzzleMap);

placeAntinodesPartTwo(antennaLocations);
