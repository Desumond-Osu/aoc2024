const fs = require('node:fs');
const map = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split(/\r?\n\r?\n/).map(row => {
    return row.split(/\r?\n/).map(val => {
        return val.split(': ')[1].split(', ').map(val => +val.split(/[+=]/)[1]);
    });
});

for (const part of ['p1', 'p2']) {
    let totalCost = 0;

    map.forEach(row => {
        if (part == 'p2') {
            row[2] = row[2].map(val => val + 10000000000000);
        }

        //some maths involving simul equations (alternatively can use Cramer's rule but it works)
        let [[aX, aY], [bX, bY], [prizeX, prizeY]] = [[row[0][0], row[0][1]], [row[1][0], row[1][1]], [row[2][0], row[2][1]]];
        
        //cross multiply
        [[aX, aY], [bX, bY], [prizeX, prizeY]] = [[aX * aY, aY * aX], [bX * aY, bY * aX], [prizeX * aY, prizeY * aX]];

        //subtract
        [[aX, aY], [bX, bY], [prizeX, prizeY]] = [[aX - aY, aY], [bX - bY, bY], [prizeX - prizeY, prizeY]];

        const b = prizeX / bX;
        const a = (prizeY - bY * b) / aY;
    
        if (!Number.isInteger(a) || !Number.isInteger(b)) {
            return;
        }

        if (part == 'p1' && (a > 100 || b > 100)) {
            return;
        }
    
        totalCost += (a * 3 + b);
    })
    
    console.log(totalCost);
}
