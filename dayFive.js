const testInput = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

const inputParser = (input) => {
  const parts = input.split(/\r?\n\r?\n/);
  const rules = parts[0].split("\n").map((rule) => {
    return ([left, right] = rule.split("|"));
  });
  const pageRules = {};
  rules.forEach(([page, placeAfter]) => {
    if (page in pageRules) {
      const currRules = pageRules[page];
      currRules.push(placeAfter);
      pageRules[page] = currRules;
    } else {
      pageRules[page] = [placeAfter];
    }
  });

  const pages = parts[1].split("\n").map((page) => {
    return page.split(",");
  });
  return { pageRules, pages };
};

const isOrdered = (pageRules, page) => {
  let ordered = true;
  for (let i = 0; i < page.length; i++) {
    const currPage = page[i];
    const rulesForPage = pageRules[currPage];
    if (rulesForPage) {
      for (let j = 0; j < rulesForPage.length; j++) {
        if (page.includes(rulesForPage[j])) {
          const indexOfCurrRule = page.indexOf(rulesForPage[j]);
          const currPageIndex = page.indexOf(currPage);
          if (currPageIndex > indexOfCurrRule) {
            ordered = false;
            break;
          }
        }
      }
    }

    if (!ordered) break;
  }
  return ordered;
};

const sortOrdered = (input) => {
  const { pageRules, pages } = input;
  const orderedPages = [];
  const unorderedPages = [];
  pages.forEach((page) => {
    const ordered = isOrdered(pageRules(page));
    if (ordered) {
      orderedPages.push(page);
    } else {
      unorderedPages.push(page);
    }
  });

  return { orderedPages, unorderedPages };
};

const fixUnorderedPages = (input) => {
  const { pageRules, pages } = input;
  const { unorderedPages } = areOrdered(pageRules, pages);
  const fixedPages = unorderedPages.map((page) => {
    let ordered = false;
    do {
      for (let i = 0; i < page.length; i++) {
        const currPage = page[i];
        const nextPage = page[i + 1];
        if (nextPage && pageRules[nextPage]) {
          if (pageRules[nextPage].includes(currPage)) {
            page[i] = nextPage;
            page[i + 1] = currPage;
          }
        }
      }
      ordered = isOrdered(pageRules, page);
    } while (!ordered);
    return page;
  });
  return fixedPages;
};

const sumMiddles = (pages) => {
  let middles = 0;
  pages.forEach((page) => {
    const center = Math.floor(page.length / 2);
    middles += Number(page[center]);
  });
  return middles;
};

const fs = require("fs");
const data = fs.readFileSync("./inputs/5.txt", "utf-8");
const puzzleInput = inputParser(data);
const orderedPages = sortOrdered(puzzleInput);
const fixedPages = fixUnorderedPages(puzzleInput);
console.log(sumMiddles(orderedPages));
console.log(sumMiddles(fixedPages));
