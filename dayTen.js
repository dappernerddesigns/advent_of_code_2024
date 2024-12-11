const mapOne = `...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9`;
const mapTwo = `..90..9
...1.98
...2..7
6543456
765.987
876....
987....`;
const mapThree = `10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01`;
const mapFour = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

const trailHeadStartsAndEnds = (map) => {
  const rows = map.split("\n");
  const starts = [];
  const ends = [];
  const mapped = [];
  rows.forEach((row, i) => {
    const foundStart = [...row.matchAll("0")];
    const foundEnd = [...row.matchAll("9")];
    if (foundStart.length) {
      foundStart.forEach((start) => {
        starts.push({ x: start.index, y: i });
      });
    }
    if (foundEnd.length) {
      foundEnd.forEach((end) => {
        ends.push({ x: end.index, y: i });
      });
    }
    const places = row.split("").map((place) => {
      if (place !== ".") {
        return Number(place);
      } else {
        return place;
      }
    });
    mapped.push(places);
  });

  return { starts, ends, map: mapped };
};

const walk = (x, y, map) => {
  let currPositionVal = 9;

  const currPosition = { x, y };

  let pathComplete = false;
  while (!pathComplete) {
    const neighbors = getNeighbors(map, currPosition.y, currPosition.x);

    const availableStep = neighbors.filter(({ position, value }) => {
      return value === currPositionVal - 1;
    });
    if (availableStep.length && currPositionVal !== 0) {
      currPosition.x = availableStep[0].position.col;
      currPosition.y = availableStep[0].position.row;
      currPositionVal--;
    } else {
      pathComplete = true;
    }
  }
  return currPositionVal === 0 ? currPosition : "invalid";
};

function getNeighbors(array, row, col) {
  const neighbors = [];
  const rows = array.length;
  const cols = array[0].length;

  const deltas = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  for (const [dr, dc] of deltas) {
    const newRow = row + dr;
    const newCol = col + dc;

    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
      neighbors.push({
        position: { row: newRow, col: newCol },
        value: array[newRow][newCol],
      });
    }
  }

  return neighbors;
}
const walkTheTrails = (mapped) => {
  const { starts, ends, map } = trailHeadStartsAndEnds(mapped);
  let totalScore = 0;
  starts.forEach((start) => {
    let score = 0;
    ends.forEach(({ x, y }) => {
      const trailWalk = walk(x, y, map);
      if (trailWalk.x === start.x && trailWalk.y === start.y) {
        score++;
      }
    });
    totalScore += score;
  });
  return totalScore;
};

console.log(trailHeadStartsAndEnds(mapFour));
