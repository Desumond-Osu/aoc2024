const fs = require('node:fs');
const file = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split('\n');

const space = file.map(row => row.split(''));

//p1
var path = [
  [-1, 0], [0, -1], [1, 0], [0, 1],
  [-1, -1], [1, -1], [-1, 1], [1, 1]
];
var word = ['X', 'M', 'A', 'S'];

var count = 0;
space.map((row, ri) => row.map((col, ci) => {
  path.forEach(([dx1, dx2]) => {
    word.every((letter, i) => space[ri + (i * dx1)]?.[ci + (i * dx2)] === letter) && count++
  })
}))

console.log(count);

//p2
path = [
  [[-1, -1], [1, 1]],
  [[-1, 1], [1, -1]]
];
count = 0;
space.forEach((row, ri) => row.forEach((col, ci) => {
  if (space[ri][ci] != 'A') {
    return;
  }

  for (const [[dx1, dy1], [dx2, dy2]] of path) {
    if ((space[ri + dx1]?.[ci + dy1] !== 'M' || space[ri + dx2]?.[ci + dy2] !== 'S') && 
      (space[ri + dx1]?.[ci + dy1] !== 'S' || space[ri + dx2]?.[ci + dy2] !== 'M')) {
      return;
    }
  }

  count++;
}))

console.log(count);