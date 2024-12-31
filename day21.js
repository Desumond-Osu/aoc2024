const fs = require('node:fs');
const codes = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split(/\r?\n/).map(code => code.split(''));

const numKeypad = {
  'A': [0, 0],
  '0': [0, -1],
  '1': [-1, -2],
  '2': [-1, -1],
  '3': [-1, 0],
  '4': [-2, -2],
  '5': [-2, -1],
  '6': [-2, 0],
  '7': [-3, -2],
  '8': [-3, -1],
  '9': [-3, 0],
};

const dirKeypad = {
  'A': [0, 0],
  '^': [0, -1],
  '<': [1, -2],
  'v': [1, -1],
  '>': [1, 0],
};

const moveString = (start, code, keypad) => {
  let result = '';
  code.forEach(c => {
    let diff = keypad[c].map((value, index) => value - start[index]);
    let logString = '';
    //thanks to https://www.reddit.com/r/adventofcode/comments/1hjgyps/2024_day_21_part_2_i_got_greedyish/
    if (
      (
        (keypad['0'] && start[1] == -2 && keypad[c][0] == 0) ||
        (keypad['<'] && start[1] == -2) ||
        diff[1] < 0
      ) &&
      (!(keypad['0'] && start[0] == 0 && keypad[c][1] == -2)) &&
      (!(keypad['<'] && keypad[c][1] == -2))
    ) { //leri + updo
      logString += diff[1] > 0 ? '>'.repeat(diff[1]) : '<'.repeat(-diff[1]);
      logString += diff[0] > 0 ? 'v'.repeat(diff[0]) : '^'.repeat(-diff[0]);
    } else { //updo + leri
      logString += diff[0] > 0 ? 'v'.repeat(diff[0]) : '^'.repeat(-diff[0]);
      logString += diff[1] > 0 ? '>'.repeat(diff[1]) : '<'.repeat(-diff[1]);
    }

    result += logString + 'A';
    start = keypad[c];
  });

  return result;
};

let totalP1 = 0;
let totalP2 = 0;

codes.forEach(code => {
  let string = moveString(numKeypad['A'], code, numKeypad);

  for (let i = 0; i < 25; i++) {
    string = moveString(dirKeypad['A'], string.split(''), dirKeypad);
    
    if (i == 1) {
      totalP1 += +code.join('').match(/^\d+/)[0] * string.length;
    }
  }

  totalP2 += +code.join('').match(/^\d+/)[0] * string.length;
});

console.log(totalP1);