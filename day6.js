const fs = require('node:fs');
const file = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split('\n');

const labMap = file.map(row => row.split(''));

let [startX, startY] = labMap.reduce((acc, line, index) => {
  const charIndex = line.indexOf('^');
  if (charIndex !== -1) {
    acc.push(index, charIndex);
  }
  return acc;
}, []);

//p1
const visitedPos = new Set();

let [x, y] = [startX, startY];
let [dirX, dirY] = [-1, 0]; //up

do {
  let key = `${x},${y} ${dirX},${dirY}`;

  if (visitedPos.has(key)) {
    break;
  };

  visitedPos.add(key);

  let [nextX, nextY] = [x + dirX, y + dirY];

  if (!labMap[nextX]?.[nextY]) {
    break;
  }

  if (labMap[nextX][nextY] === '#') {
    [dirX, dirY] = [dirY, -dirX];
    [nextX, nextY] = [x + dirX, y + dirY];
  }

  [x, y] = [nextX, nextY];
} while(1);

const visitedPosArr = new Set([...visitedPos].map(tile => tile.split(' ')[0]));
console.log(visitedPosArr.size);

//p2
const blockArr = new Set();

visitedPosArr.forEach(block => {
  let [blockX, blockY] = block.split(',');
  let valid = false;

  let visitedPos = new Set();

  [x, y] = [startX, startY];
  [dirX, dirY] = [-1, 0];

  do {
    let key = `${x},${y} ${dirX},${dirY}`;
  
    if (visitedPos.has(key)) {
      valid = true;
      break;
    };
  
    visitedPos.add(key);
  
    let [nextX, nextY] = [x + dirX, y + dirY];
  
    if (!labMap[nextX]?.[nextY]) {
      break;
    }
  
    if (labMap[nextX][nextY] === '#' || (nextX == blockX && nextY == blockY)) {
      [dirX, dirY] = [dirY, -dirX];
      [nextX, nextY] = [x + dirX, y + dirY];

      if (labMap[nextX][nextY] === '#' || (nextX == blockX && nextY == blockY)) {
        [dirX, dirY] = [dirY, -dirX];
        [nextX, nextY] = [x + dirX, y + dirY];
      }
    }
  
    [x, y] = [nextX, nextY];
  } while(1);

  if (valid) {
    blockArr.add(`${blockX},${blockY}`);
  }
})

console.log(blockArr.size);