const fs = require('node:fs');
const map = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split(/\r?\n/).map(row => row.split(''));

const [endX, endY] = map.reduce((acc, line, index) => {
  const charIndex = line.indexOf('E');
  if (charIndex !== -1) {
    acc.push(index, charIndex);
  }
  return acc;
}, []);

//assign distance starting from end (0) to start (xxx)
const queue = [[endX, endY, (new Set()).add(`${endX},${endY}`)]];
const log = new Map();
let path = null;

while (queue.length > 0) {
    const [x, y, pathTaken] = queue.shift();

    log.set(`${x},${y}`, pathTaken.size - 1);

    for (const [dirX, dirY] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
        const [nx, ny] = [x + dirX, y + dirY];

        if (nx < 0 || nx >= map.length || ny < 0 || ny >= map[0].length || map[nx][ny] == '#' || log.has(`${nx},${ny}`)) {
            continue;
        }

        const newPathTaken = new Set(pathTaken);
        newPathTaken.add(`${nx},${ny}`)

        if (map[nx][ny] == 'S') {
            path = newPathTaken; //store correct path
        }

        queue.push([nx, ny, newPathTaken]);
    }
}

//for each point along correct path, do a bfs of radius 20 from each point and calculate total distance
for (const part of ['p1', 'p2']) {
    const distanceMap = new Map();

    for (const node of path) {
        const [currX, currY] = node.split(',').map(Number);
        const queue = [[currX, currY, 0]];
        const innerLog = new Set();
        const queueTracker = new Set([`${currX},${currY}`]);

        while (queue.length > 0) {
            const [x, y, steps] = queue.shift();
            queueTracker.delete(`${x},${y}`);

            if (steps >= (part == 'p1' ? 2 : 20)) {
                continue;
            }

            innerLog.add(`${x},${y}`);

            for (const [dirX, dirY] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
                const [nx, ny] = [x + dirX, y + dirY];
                const newCoords = `${nx},${ny}`;
        
                if (nx < 0 || nx >= map.length || ny < 0 || ny >= map[0].length || innerLog.has(newCoords)) {
                    continue;
                }
        
                if (log.has(newCoords) && !distanceMap.has(`${currX},${currY}-${newCoords}`)) {
                    distanceMap.set(`${currX},${currY}-${newCoords}`, (path.size - 1) - log.get(`${currX},${currY}`) + (steps + 1) + log.get(newCoords));
                }
        
                if (!queueTracker.has(newCoords)) {
                    queue.push([nx, ny, steps + 1]);
                    queueTracker.add(newCoords);
                }
            }
        }
    }

    console.log(new Map([...distanceMap].filter(([key, val]) => (path.size - 1) - val >= 100)).size);    
}