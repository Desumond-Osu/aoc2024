const fs = require('node:fs');
let stones = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split(' ').map(Number).reduce((acc, key) => {
    acc[key] = 1;
    return acc;
}, {});

for (let i = 0; i < 75; i++) {
    Object.entries(stones).forEach(([stone, value]) => {
        if (value == 0) {
            return;
        }

        stones[stone] -= value;

        if (stone == 0) {
            stones['1'] = (stones['1'] ?? 0) + value;
            return;
        }

        if ((stone + '').length % 2 == 1) {
            const stone2024 = stone * 2024;
            stones[stone2024] = (stones[stone2024] ?? 0) + value;
            return;
        }

        stone += '';
        const halfLength = stone.length / 2;
        const [stoneL, stoneR] = [+stone.slice(0, halfLength), +stone.slice(halfLength)];

        stones[stoneL] = (stones[stoneL] ?? 0) + value;
        stones[stoneR] = (stones[stoneR] ?? 0) + value;
    })

    if ([24, 74].includes(i)) { //[p1, p2]
        console.log(Object.values(stones).reduce((total, value) => total + value, 0));
    }
}