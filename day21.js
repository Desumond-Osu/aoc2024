const fs = require('node:fs');
const codes = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split(/\r?\n/);

const number = {
  '7': [0, 0], '8': [0, 1], '9': [0, 2],
  '4': [1, 0], '5': [1, 1], '6': [1, 2],
  '1': [2, 0], '2': [2, 1], '3': [2, 2],
  '0': [3, 1], 'A': [3, 2]
};

const small = {
  '^': [0, 1], 'A': [0, 2],
  '<': [1, 0], 'v': [1, 1], '>': [1, 2]
};

const getDir = {
  '^': [-1, 0],
  'v': [1, 0],
  '<': [0, -1],
  '>': [0, 1]
};

const perms = [];
(function generate(arr, current) {
  if (arr.length === 0) {
    perms.push(current);
  } else {
    for (let i = 0; i < arr.length; i++) {
      const next = arr.slice();
      next.splice(i, 1);
      generate(next, current.concat(arr[i]));
    }
  }
})([0, 1, 2, 3], []);

const memo = new Map();

function smallStep(py, px, ny, nx, depth, maxDepth) {
  const key = `${py},${px},${ny},${nx},${depth}`;

  if (memo.has(key)) {
    return memo.get(key);
  }

  const [dy, dx] = [ny - py, nx - px];
  let log = Infinity;

  for (const perm of perms) {
    let string = '';
    for (const p of perm) {
      string += 
        p == 0 && dx > 0 ? '>'.repeat(dx) :
        p == 1 && dy > 0 ? 'v'.repeat(dy) :
        p == 2 && dx < 0 ? '<'.repeat(-dx) :
        p == 3 && dy < 0 ? '^'.repeat(-dy) : '';
    }
    string += 'A';

    const [gapy, gapx] = depth >= 0 ? [0, 0] : [3, 0];
    let [tempPy, tempPx] = [py, px];

    let valid = !string.split('').some(c => {
      if (c == 'A') {
        return false;
      }

      const [dy, dx] = getDir[c];
      tempPy += dy;
      tempPx += dx;

      return tempPy == gapy && tempPx == gapx;
    });

    if (valid) {
      log = Math.min(log, walkLine(string, depth + 1, maxDepth));
    }
  }

  memo.set(key, log);
  return log;
}

function walkLine(line, depth, maxDepth) {
  if (depth == maxDepth) {
    return line.length;
  }

  const table = depth >= 0 ? small : number;
  let [py, px] = table['A'];
  let size = 0;

  for (const c of line) {
    const [ny, nx] = table[c];
    size += smallStep(py, px, ny, nx, depth, maxDepth);
    [py, px] = [ny, nx];
  }

  return size;
}

function solve(maxDepth) {
  let total = 0;
  memo.clear();

  for (const code of codes) {
    const n = walkLine(code, -1, maxDepth);
    total += n * parseInt(code.match(/^\d+/)[0]);
  }

  console.log(total);
}

solve(2);
solve(25);