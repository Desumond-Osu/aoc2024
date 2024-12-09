const fs = require('node:fs');
const file = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').replace(/\r?\n/g, '');

//p1
const mul = file.match(/mul\(\d+,\d+\)/g);

const total = mul.reduce((acc, row) => {
  const [a, b] = row.match(/\d+/g);
  return acc + (a * b);
}, 0);

console.log(total);

//p2
const mulDo = file.replace(/don't\(\).*?do\(\)/g, '').replace(/don't\(\).*/, '').match(/mul\(\d+,\d+\)/g);

const totalDo = mulDo.reduce((acc, row) => {
  const [a, b] = row.match(/\d+/g);
  return acc + (a * b);
}, 0);

console.log(totalDo);