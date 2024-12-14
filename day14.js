const fs = require('node:fs');
let map = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split(/\r?\n/).map(val => val.split(' ').map(val => val.split('=')[1]).map(val => val.split(',').map(Number)));

const [w, h] = [101, 103];
const [wHalfIndex, hHalfIndex] = [(w + 1) / 2 - 1, (h + 1) / 2 - 1]; //50 and 51

const wrapAround = (spot, length) => (spot % length + length) % length;

const getRightSidePercentage = (map) => {
    const mapSet = new Set(map.map(([spot]) => `${spot[0]},${spot[1]}`));
    let rightSideCount = 0;

    for (const [spot] of map) {
        const [x, y] = spot;
        if (mapSet.has(`${x + 1},${y}`)) {
            rightSideCount++;
        }
    }

    return rightSideCount / map.length;
};

const getQuadrantProduct = (map) => {
    const quadrants = [0, 0, 0, 0];

    map.forEach(([[robotX, robotY]]) => {
        if (robotX === wHalfIndex || robotY === hHalfIndex) {
            return;
        }

        const index = robotX < wHalfIndex ? (robotY < hHalfIndex ? 0 : 1) : (robotY < hHalfIndex ? 2 : 3);

        quadrants[index]++;
    });

    return quadrants.reduce((acc, val) => acc * val, 1);
};

for (let i = 0;; i++) {
    map = map.map(([[robotX, robotY], [vectorX, vectorY]]) => {
        return [[wrapAround(robotX + vectorX, w), wrapAround(robotY + vectorY, h)], [vectorX, vectorY]];
    });
    
    //p1
    if (i == 99) {
        console.log(getQuadrantProduct(map));
    }

    //p2
    if (getRightSidePercentage(map) > 0.4) { // 0.2 to 0.5 works for me
        console.log(i + 1);
        break;
    }
}