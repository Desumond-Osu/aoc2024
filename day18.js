const fs = require('node:fs');
const wallP2 = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split(/\r?\n/);

const wallP1 = wallP2.slice(0, 1024);

const [wIndex, yIndex] = [70, 70];

const traverse = (wall) => {
  const result = [];
  const queue = [[[0, 0], (new Set()).add('0,0')]];
  const log = new Map();

  while (queue.length > 0) {
    let [[x, y], pathVisited] = queue.shift();

    const key = `${x},${y}`;

    if (log.has(key) && log.get(key) <= pathVisited.size) {
      continue;
    }

    log.set(key, pathVisited.size);

    for (const [dx, dy] of [[0 ,-1], [-1, 0], [0, 1], [1, 0]]) {
      let [newX, newY] = [x + dx, y + dy];

      if (newX < 0 || newY < 0 || newX > wIndex || newY > yIndex || wall.includes(`${newY},${newX}`)) {
        continue;
      }

      const visitedKey = `${newX},${newY}`;
      if (pathVisited.has(visitedKey)) {
        continue;
      }

      let newVisited = new Set(pathVisited);
      newVisited.add(visitedKey);

      if (newX == wIndex && newY == yIndex) {
          result.push(newVisited.size);
          continue;
      }

      queue.push([[newX, newY], newVisited]);
    }
  }

  return result;
}

//p1
console.log(Math.min(...traverse(wallP1)) - 1);

//p2
for (let i = 1025; i < wallP2.length; i++) {
  if (traverse(wallP2.slice(0, i)).length > 0) {
    continue;
  }

  console.log(wallP2[i - 1]);
  break;
}