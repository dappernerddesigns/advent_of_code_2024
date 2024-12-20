const testStones = ["0", "1", "10", "99", "999"];
const testierStones = ["125", "17"];
const stones = ["773", "79858", "0", "71", "213357", "2937", "1", "3998391"];

/*
if a stone is 0, replaced by a stone of 1
even number is split over 2 stones - leading zeros aren't counted 100 => 10, 0
if neither condition, stone is multiplied by 2024
order is preserved
*/

const divideStone = (stone) => {
  const middle = stone.length / 2;
  const left = stone.slice(0, middle);
  const right = stone.slice(middle);
  return [+left, +right];
};
const mutateStone = (stone) => {
  let strStone = stone;
  if (typeof stone === "number") {
    strStone = stone.toString();
  }
  if (strStone === "0") {
    return 1;
  }
  if (strStone.length % 2 === 0) {
    return divideStone(strStone);
  }
  return +stone * 2024;
};

// part one
const stoneCycle = (stones, blinks) => {
  let changingStones = [...stones];
  while (blinks > 0) {
    const temp = [];
    changingStones.forEach((stone) => {
      const stones = mutateStone(stone);
      if (stones.length > 1) {
        temp.push(...stones);
      } else {
        temp.push(stones);
      }
    });
    changingStones = temp;

    blinks--;
  }
  return changingStones.length;
};
const sortStones = (stones, stoneStacks) => {
  stones.forEach((stone) => {
    const stoneStr = stone.toString();
    if (stoneStr.length % 2 === 0) {
      stoneStacks.even.push(stoneStr);
    } else if (stoneStr === "1") {
      stoneStacks["1"].push(stoneStr);
    } else if (stoneStr === "0") {
      stoneStacks["0"].push(stoneStr);
    } else {
      stoneStacks.other.push(stoneStr);
    }
  });
};
// part two
