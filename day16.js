const fs = require('node:fs');
const map = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split(/\r?\n/).map(a => a.split(''));

console.log("It's gonna take around 8 seconds to process:");

const [startX, startY] = map.reduce((acc, line, index) => {
  const charIndex = line.indexOf('S');
  if (charIndex !== -1) {
    acc.push(index, charIndex);
  }
  return acc;
}, []);

const log = new Map();
const result = [];

const queue = [[[startX, startY], [0, 1], [], 0, new Set()]];

while (queue.length > 0) {
  let [[x, y], [prevDirX, prevDirY], tempPath, turns, pathVisited] = queue.shift();

  if (map[x][y] == 'E') {
    result.push([tempPath.length + turns * 1000, pathVisited]);
    continue;
  }

  const positionKey = `${x},${y},${prevDirX},${prevDirY}`;

  if (log.has(positionKey) && log.get(positionKey) < tempPath.length + turns * 1000) {
    continue;
  }

  log.set(positionKey, tempPath.length + turns * 1000);

  for (const [dx, dy] of [[0 ,-1], [-1, 0], [0, 1], [1, 0]]) {
    let [newX, newY] = [x + dx, y + dy];

    if (newX < 0 || newY < 0 || newX >= map.length || newY >= map[0].length || map[newX][newY] === '#') {
      continue;
    }

    const visitedKey = `${newX},${newY}`;
    if (pathVisited.has(visitedKey)) {
      continue;
    }

    let newTempPath = [...tempPath, [[x, y], [prevDirX, prevDirY]]];
    let newTurns = turns + (prevDirX != dx || prevDirY != dy);

    let newVisited = new Set(pathVisited);
    newVisited.add(visitedKey);

    queue.push([[newX, newY], [dx, dy], newTempPath, newTurns, newVisited]);
  }
}

const lowest = Math.min(...result.map(item => item[0]));
const lowestSets = result.filter(item => item[0] == lowest).map(item => item[1]);

const finalSet = new Set();

lowestSets.forEach(set => {
  set.forEach(item => finalSet.add(item));
});

console.log(lowest); //p1
console.log(finalSet.size + 1); //p2 (add one for current pos)