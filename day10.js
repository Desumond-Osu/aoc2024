const fs = require('node:fs');

const trailheads = [];
const map = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split(/\r?\n/).map((row, x) => {
  row = row.split('');
  row.forEach((col, y) => {
    if (col == 0) {
      trailheads.push([x, y, +col]);
    }
  });
  return row;
});

const directions = [
  [1, 0],
  [-1, 0],
  [0, -1],
  [0, 1],
];

const scoreSet = new Set();
const scoreArr = [];

trailheads.forEach(([trailX, trailY, height]) => {
  const queue = [[trailX, trailY, height]];

  while(queue.length > 0) {
    let [cx, cy, h] = queue.shift();
    h++;

    for (const [dx, dy] of directions) {
      const nx = cx + dx;
      const ny = cy + dy;

      if (map[nx]?.[ny] != h) {
        continue;
      }

      if (map[nx]?.[ny] == 9) {
        scoreSet.add(`${trailX},${trailY},${nx},${ny}`);
        scoreArr.push(`${trailX},${trailY},${nx},${ny}`);
        continue;
      }
  
      queue.push([nx, ny, h]);
    }
  }
})

console.log(scoreSet.size);
console.log(scoreArr.length);