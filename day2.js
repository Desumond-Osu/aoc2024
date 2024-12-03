const fs = require('node:fs');
const file = fs.readFileSync(`inputs/${__filename.split('/').pop().replace('.js', '')}.txt`, 'utf8').split('\n');

//p1
var safe = 0;
file.forEach(line => {
  var old = null;
  var sign = null;
  var valid = true;

  line.split(' ').forEach(num => {
    if (!old) {
      old = num;
      return;
    }

    if (old == num) {
      valid = false;
    }

    if (!sign) {
      sign = old - num < 0 ? 'neg' : 'pos';
    }

    if (Math.abs(old - num) > 3 || ((old - num) < 0 && sign == 'pos') || ((old - num) > 0 && sign == 'neg')) {
      valid = false;
    }

    old = num;
  });

  if (valid) {
    safe++;
  }
})

console.log(safe);


//p2
var safe = 0;
file.forEach(line => {
  var validOuter = false;

  const numbers = line.split(' ');
  const result = numbers.map((_, index) => numbers.filter((_, i) => i !== index));
  result.push(numbers);

  result.forEach(lineNum => {
    var old = null;
    var sign = null;
    var valid = true;

    if (validOuter) {
      return;
    }

    lineNum.forEach(num => {
      if (!old) {
        old = num;
        return;
      }
  
      if (old == num) {
        valid = false;
      }
  
      if (!sign) {
        sign = old - num < 0 ? 'neg' : 'pos';
      }
  
      if (Math.abs(old - num) > 3 || ((old - num) < 0 && sign == 'pos') || ((old - num) > 0 && sign == 'neg')) {
        valid = false;
      }
  
      old = num;
    });
  
    if (valid) {
      validOuter = true;
    }
  })
  
  if (validOuter) {
    safe++;
  }
})

console.log(safe);