const fs = require('node:fs');
const file = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split('\n').map(line => {
    const [total, numbers] = line.split(':');
    return [+total, numbers.trim().split(' ').map(Number)];
});

for (const operators of [['+', '*'], ['+', '*', '']]) { //p1 and p2
    let total = 0;

    file.forEach(([value, numbers]) => {
        let arr = [numbers[0]];
        for (let i = 1; i < numbers.length; i++) {
            let subArr = [];
            arr.forEach(num => {
                operators.forEach(op => {
                    switch (op) {
                        case '+': subArr.push(num + numbers[i]); break;
                        case '*': subArr.push(num * numbers[i]); break;
                        case '' : subArr.push(+`${num}${numbers[i]}`);
                    }
                })
            })
            arr = subArr;
        }
        if (arr.includes(value)) {
            total += value;
        }
    })

    console.log(total);
}