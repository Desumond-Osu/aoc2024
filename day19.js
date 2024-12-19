const fs = require('node:fs');
let [patterns, designs] = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split(/\r?\n\r?\n/);
patterns = patterns.split(', ');
designs = designs.split(/\r?\n/);

const allMapping = [];

designs.forEach(design => {
  const mapping = {};

  for (let i = 0; i < design.length; i++) {
    const length = [];
    patterns.forEach(pattern => {
      if (design.indexOf(pattern, i) == i) {
        length.push(pattern.length + i);
      }
    })

    mapping[i] = length;
  }

  allMapping.push(mapping);
})

let p1Total = 0;
let p2Total = 0;

function countPaths(map, currentTowel, targetTowel, memo = {}) {
  if (currentTowel in memo) {
    return memo[currentTowel];
  }

  if (currentTowel >= targetTowel) {
    return 1;
  }

  let totalPaths = 0;
  for (const neighbor of map[currentTowel]) {
    totalPaths += countPaths(map, neighbor, targetTowel, memo);
  }

  memo[currentTowel] = totalPaths;
  return totalPaths;
}

allMapping.forEach(map => {
  let totalSolutions = countPaths(map, 0, Object.keys(map).length);
  if (totalSolutions > 0) {
    p1Total++;
  }
  p2Total += totalSolutions;
});

console.log(p1Total);
console.log(p2Total);