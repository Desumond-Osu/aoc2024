const fs = require('node:fs');
const diskMap = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split('');

let line = [];
let lineArr = [];
let diskNum = 0;

diskMap.forEach((disk, i) => {
  let char = i % 2 === 0 ? diskNum++ : '.';
  for (let j = 0; j < disk; j++) {
    line.push(char);
  }

  if (char != '.' || disk != 0) {
    lineArr[i] = char == '.' ? [+disk] : [+disk, char];
  }
});

lineArr = lineArr.filter(Boolean);

//p1
for (let i = line.length - 1; i >= 0; i--) {
  if (line[i] == '.') {
    continue;
  }

  let dot = line.indexOf('.');
  if (dot > i) {
    break;
  }

  [line[dot], line[i]] = [line[i], '.'];
}

const total = line.reduce((acc, val, i) => (val == '.' ? acc : acc + val * i), 0)
console.log(total);

//p2
for (let i = lineArr.length - 1; i >= 0; i--) {
  if (lineArr[i].length == 1) {
    continue;
  }

  for (let j = 0; j < i; j++) {
    if (lineArr[j].length == 2 || lineArr[j][0] < lineArr[i][0]) {
      continue;
    }

    let diff = lineArr[j][0] - lineArr[i][0];
    if (diff > 0) {
      lineArr[j][0] = diff;
      lineArr.splice(j, 0, lineArr[i]);
      i++;
    } else {
      lineArr[j] = lineArr[i];
    }

    lineArr[i] = [lineArr[i][0]];
    break;
  }
}

let i = 0;
let totalP2 = 0;
lineArr.forEach(line => {
  if (line.length == 1) {
    i += line[0];
  } else for (let j = 0; j < line[0]; j++) {
    totalP2 += i++ * line[1];
  }
})

console.log(totalP2);