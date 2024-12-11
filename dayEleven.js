const testStones = ["0", "1", "10", "99", "999"];
const testierStones = ["125", "17"];
const stones = ["773", "79858", "0", "71", "213357", "2937", "1", "3998391"];

/*
if a stone is 0, replaced by a stone of 1
even number is split over 2 stones - leading zeros aren't counted 100 => 10, 0
if neither condition, stone is multiplied by 2024
order is preserved
*/
const stoneCycle = (stones, blinks) => {
  let newStones = [...stones];
  while (blinks > 0) {
    const newStones = [...stones];
    for (let i = 0; i < newStones.length; i++) {}
  }
};

stoneCycle(testStones, 2);
