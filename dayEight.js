const { map, map2, map3 } = require("./inputs/day8test");

const findAntennas = (input) => {
  const rows = input.split("\n");
  const antenna = {};
  const allAntenna = [];
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
        allAntenna.push(`${x},${y}`);
      }
    }
  });
  const boundary = { x: rows[0].length - 1, y: rows.length - 1 };
  return { antenna, allAntenna, boundary };
};

const placeAntinodes = ({ antenna, boundary, allAntenna }) => {
  const uniqueLocations = new Set();

  for (const freq in antenna) {
    const coords = antenna[freq];
    while (coords.length >= 2) {
      const currCoord = coords.shift();
      coords.forEach((coord) => {
        const antiNodeOne = {
          x: currCoord.x - coord.x,
          y: currCoord.y - coord.y,
        };
        const placeAntiNodeOne = {
          x: currCoord.x + antiNodeOne.x,
          y: currCoord.y + antiNodeOne.y,
        };
        const antiNodeTwo = {
          x: coord.x - currCoord.x,
          y: coord.y - currCoord.y,
        };
        const placeAntiNodeTwo = {
          x: coord.x + antiNodeTwo.x,
          y: coord.y + antiNodeTwo.y,
        };
        if (
          inBoundary(boundary, placeAntiNodeOne) &&
          !antennaHere(allLocations, placeAntiNodeOne)
        )
          uniqueLocations.add(placeAntiNodeOne);
        if (
          inBoundary(boundary, placeAntiNodeTwo) &&
          !antennaHere(allLocations, placeAntiNodeTwo)
        )
          uniqueLocations.add(placeAntiNodeTwo);
      });
    }
  }
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
const antennaHere = (locations, coords) => {
  return locations.some(
    (item) =>
      Object.keys(coords).length === Object.keys(item).length &&
      Object.keys(coords).every((key) => coords[key] === item[key])
  );
};
const { readFileSync } = require("fs");
const puzzleMap = readFileSync("./inputs/08.txt", "utf-8");
const antennaLocations = findAntennas(puzzleMap);

placeAntinodes(antennaLocations);
