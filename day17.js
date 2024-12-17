const fs = require('node:fs');
let [registers, program] = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split(/\r?\n\r?\n/);

registers = registers.split('\n').map(register => register.split(':')[1].trim());
program = program.split(':')[1].trim().split(',').reduce((acc, _, i, arr) => (i % 2 === 0 ? acc.push(arr.slice(i, i + 2)) : acc, acc), []);

for (let i = 0; i < program.length; i++) {
  let [opcode, operand] = program[i].map(Number);
  
  // switch (opcode) {
  //   case 0:
  //     break;
  //   case 1:
  //     break;
  // }
}