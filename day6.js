const fs = require('node:fs');
const file = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split('\n');

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
let block = 0;

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
  } else {
    let dirXInner = dirY;
    let dirYInner = -dirX;

    let nextXInner = x + dirXInner;
    let nextYInner = y + dirYInner;

    if (labMap[nextXInner]?.[nextYInner] === '#') {
      temp = dirXInner;
      dirXInner = dirYInner;
      dirYInner = -temp;
  
      nextXInner = x + dirXInner;
      nextYInner = y + dirYInner;
    }

    let [xInner, yInner] = [nextXInner, nextYInner];

    console.log(`${x},${y} ${dirX},${dirY}  ` + `${xInner},${yInner} ${dirXInner},${dirYInner}`)

    const visitedPosInner = new Set();
    let valid = false;
    do {
      const keyInner = `${xInner},${yInner} ${dirXInner},${dirYInner}`;

      if (visitedPosInner.has(keyInner)) {
        valid = true;
        break;
      };
    
      visitedPosInner.add(keyInner);
    
      nextXInner = xInner + dirXInner;
      nextYInner = yInner + dirYInner;
    
      if (labMap[nextXInner]?.[nextYInner] === undefined) {
        break;
      }
    
      if (labMap[nextXInner][nextYInner] === '#') {
        temp = dirXInner;
        dirXInner = dirYInner;
        dirYInner = -temp;
    
        nextXInner = xInner + dirXInner;
        nextYInner = yInner + dirYInner;
      }
    
      [xInner, yInner] = [nextXInner, nextYInner];
    } while(1);
    
    if (valid) {
      block++;
    }
  }

  [x, y] = [nextX, nextY];
} while(1);

const visitedPosArr = [new Set([...visitedPos].map(tile => tile.split(' ')[0])).size];
console.log(visitedPosArr[0]); //p1
console.log(block);

// /,1 -1,0$/
// /^4,.* -1,0$/

// visitedPos.forEach(v => {
//   [[x, y], [dirX, dirY]] = v.split(' ').map(p => p.split(',').map(Number));

//   nextX = x + dirX;
//   nextY = y + dirY;

//   if (labMap[nextX][nextY] == '#') {
//     return;
//   }

//   temp = dirX;
//   dirX = dirY;
//   dirY = -temp;

//   nextX = x + dirX;
//   nextY = y + dirY;

//   let searchPattern = null;

//   if (Math.abs(dirX) == 1) {
//     searchPattern = new RegExp(`,${y} ${dirX},${dirY}`);
//   } else {
//     searchPattern = new RegExp(`^${x},.* ${dirX},${dirY}$`);
//   }
  
//   let found = [...visitedPos].find(value => searchPattern.test(value));
//   console.log([x, y], found)
// })