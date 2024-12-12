const fs = require('node:fs');
const map = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split(/\r?\n/).map(a => a.split(''));

const directions = [
  [1, 0],
  [-1, 0],
  [0, -1],
  [0, 1],
];

const garden = new Map();
const history = new Set();

let gardenIndex = 0;

map.forEach((row, rI) => {
  row.forEach((col, cI) => {
    const cellKey = `${rI},${cI}`;

    if (history.has(cellKey)) {
      return;
    }

    const queue = [[rI, cI]];
    const plantOri = map[rI][cI];
    garden.set(gardenIndex, [0, 0]);

    while (queue.length > 0) {
      const [curX, curY] = queue.pop();
      const cellKey = `${curX},${curY}`;

      if (history.has(cellKey)) {
        continue;
      }

      history.add(cellKey);
      const plant = map[curX][curY];

      if (plant === plantOri) {
        const [area, peri] = garden.get(gardenIndex);
        garden.set(gardenIndex, [area + 1, peri]);
      }

      for (const [dx, dy] of directions) {
        const [nx, ny] = [curX + dx, curY + dy];

        if (map[nx]?.[ny] === plantOri) {
          queue.push([nx, ny]);
        } else {
          const [area, peri] = garden.get(gardenIndex);
          garden.set(gardenIndex, [area, peri + 1]);
        }
      }
    }

    gardenIndex++;
  });
});

console.log([...garden.values()].reduce((sum, [area, peri]) => sum + area * peri, 0));
