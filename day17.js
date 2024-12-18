const fs = require('node:fs');
let [registers, program] = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split(/\r?\n\r?\n/);

let [A, B, C] = registers.split('\n').map(register => BigInt(register.split(':')[1].trim()));
program = program.split(':')[1].trim().split(',').reduce((acc, _, i, arr) => (i % 2 === 0 ? acc.push(arr.slice(i, i + 2).map(Number)) : acc, acc), []);

const comboList = (combo) => {
  switch (combo) {
    case 4: return A;
    case 5: return B;
    case 6: return C;
  }
  return BigInt(combo);
}

const instruct = (p2A=null) => {
  A = p2A ?? A;

  let value = [];
  for (let i = 0; i < program.length; i++) {
    let [opcode, operand] = program[i];

    switch (opcode) {
      case 0:
        A = A / (2n ** comboList(operand));
        break;
      case 1:
        B = B ^ BigInt(operand);
        break;
      case 2:
        B = comboList(operand) % 8n;
        break;
      case 3:
        if (A != 0n) i = operand - 1;
        break;
      case 4:
        B = B ^ C;
        break;
      case 5:
        value.push(comboList(operand) % 8n);
        break;
      case 6:
        B = A / (2n ** comboList(operand));
        break;
      case 7:
        C = A / (2n ** comboList(operand));
        break;
    }
  }
  return value;
}

//p1
console.log(instruct().toString());

//p2
const flatProgram = program.flat().toString();
for (i = 0n; i < Infinity; i++) {
  let output = instruct(i).toString();
  if (output == flatProgram) {
    console.log(i.toString());
    break;
  }

  if (flatProgram.endsWith(output) && i != 0) {
    i *= 8n; i--;
  }
}