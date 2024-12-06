const fs = require('node:fs');
const file = fs.readFileSync(`inputs/${__filename.split('/').pop().replace('.js', '')}.txt`, 'utf8').split('\n');

const labMap = file.map(row => row.split(''));

let [x, y] = labMap.reduce((acc, line, index) => {
  const charIndex = line.indexOf('^');
  if (charIndex !== -1) {
    acc.push(index, charIndex);
  }
  return acc;
}, []);

const visitedPos = new Set();
let [dirX, dirY] = [-1, 0]; //up

do {
  const key = `${x},${y} ${dirX},${dirY}`;

  if (visitedPos.has(key)) {
    break;
  };

  visitedPos.add(key);

  let nextX = x + dirX;
  let nextY = y + dirY;

  if (labMap[nextX]?.[nextY] === undefined) {
    break;
  }

  if (labMap[nextX][nextY] === '#') {
    temp = dirX;
    dirX = dirY;
    dirY = -temp;

    nextX = x + dirX;
    nextY = y + dirY;
  }

  [x, y] = [nextX, nextY];
} while(1);

const visitedPosArr = [new Set([...visitedPos].map(tile => tile.split(' ')[0])).size];
console.log(visitedPosArr[0]); //p1
