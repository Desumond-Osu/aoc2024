const fs = require('node:fs');
const file = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split('\n');

const l = [];
const r = [];
const rCounter = [];

file.forEach(line => {
  const [left, right] = line.split(/\s+/);
  l.push(left);
  r.push(right);

  rCounter[right] = (rCounter[right] || 0) + 1;
})

l.sort();
r.sort();

//p1
total = 0;
for (var i = 0; i < l.length; i++) {
  total += Math.abs(l[i] - r[i]);
}

console.log(total);

//p2
total = 0;
l.forEach(line => {
  total += line * (rCounter[line] ?? 0);
})

console.log(total);