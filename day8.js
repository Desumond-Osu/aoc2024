const fs = require('node:fs');
const file = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split(/\r?\n/);

const antennas = {};

const map = file.map((row, rI) => row.split('').forEach((col, cI) => {
    if (col !== '.') {
        antennas[col] = antennas[col] ?? [];
        antennas[col].push([rI, cI]);
    }
}));

const [w, h] = [file.length, file[0].length];

//p1
const antiSet = new Set();

for (const key in antennas) {
    let length = antennas[key].length;

    for (let i = 0; i < length - 1; i++) {
        for (let j = i + 1; j < length; j++) {
            let [[x1, y1], [x2, y2]] = [antennas[key][i], antennas[key][j]];
            let anti = [[2 * x1 - x2, 2 * y1 - y2], [2 * x2 - x1, 2 * y2 - y1]];

            anti.forEach(([x, y]) => {
                if (x >= 0 && x < h && y >= 0 && y < w) {
                    antiSet.add(`${x},${y}`);
                }
            })
        }
    }
}

console.log(antiSet.size);

//p2
const antiSetNew = new Set();

for (const key in antennas) {
    let length = antennas[key].length;

    for (let i = 0; i < length - 1; i++) {
        for (let j = i + 1; j < length; j++) {
            let [[x1, y1], [x2, y2]] = [antennas[key][i], antennas[key][j]];

            antiSetNew.add(`${x1},${y1}`);
            antiSetNew.add(`${x2},${y2}`);
            
            let [dx, dy] = [x1 - x2, y1 - y2];
            for (var [x, y] of [[x1, y1], [x2, y2]]) {
                let [newX, newY] = [x, y];
                do {
                    [newX, newY] = [x + dx, y + dy];
                    if (newX < 0 || newX >= h || newY < 0 || newY >= w) {
                        break;
                    }

                    antiSetNew.add(`${newX},${newY}`);
                    [x, y] = [newX, newY];
                } while(1);

                [dx, dy] = [-dx, -dy];
            }
        }
    }
}

console.log(antiSetNew.size);