const fs = require('node:fs');
let map = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split(/\r?\n\r?\n/).map(row => row.split(/\r?\n/));

let locks = [];
let keys = [];

for (const arr of map) {
  (arr[0] === '#####' ? locks : keys).push(arr.join(''));
}

let total = 0;

for (const lock of locks) {
  for (const key of keys) {
    if (!lock.split('').some((char, i) => char === '#' && key[i] === '#')) {
      total++;
    }
  }
}

console.log(total);