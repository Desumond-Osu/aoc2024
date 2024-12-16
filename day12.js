const fs = require('node:fs');
const map = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split(/\r?\n/).map(a => a.split(''));

const visitedCells = new Set();
const directions = {
    u: [-1, 0], r: [0, 1], l: [0, -1], d: [1, 0], ur: [-1, 1], ul: [-1, -1], dl: [1, -1], dr: [1, 1]
};

const getFenceAndCorners = (map, x, y) => {
    const [curr, u, r, l, d, ur, ul, dl, dr] = [map[x][y], ...Object.keys(directions).map(dir => {
		const [dx, dy] = directions[dir];
		return map[x + dx]?.[y + dy];
	})];

    const fences = [curr != u, curr != r, curr != l, curr != d].filter(Boolean).length;

    const corners = [
        !(curr == u || curr == l) || (curr == u && curr == l && curr != ul),
		!(curr == u || curr == r) || (curr == u && curr == r && curr != ur),
        !(curr == d || curr == l) || (curr == d && curr == l && curr != dl),
        !(curr == d || curr == r) || (curr == d && curr == r && curr != dr)
    ].filter(Boolean).length;

    return [fences, corners];
};

const walk = (map, startX, startY) => {
    const queue = [[startX, startY]];
    const garden = [];
    visitedCells.add(`${startX}-${startY}`);

    while (queue.length > 0) {
        const [x, y] = queue.pop();
        garden.push([x, y]);

        for (const [dx, dy] of Object.values(directions).slice(0, 4)) { //u r l d
            const nx = x + dx;
            const ny = y + dy;
            const key = `${nx}-${ny}`;

            if (nx >= 0 && ny >= 0 && nx < map.length && ny < map[0].length && !visitedCells.has(key) && map[nx][ny] == map[x][y]) {
                visitedCells.add(key);
                queue.push([nx, ny]);
            }
        }
    }

    return garden;
};

let p1 = 0;
let p2 = 0;

for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        const key = `${i}-${j}`;
        if (!visitedCells.has(key)) {
            const garden = walk(map, i, j);
            let gardenFences = 0;
            let gardenCorners = 0; //same thing as sides

            for (const [x, y] of garden) {
                const [fences, corners] = getFenceAndCorners(map, x, y);
                gardenFences += fences;
                gardenCorners += corners;
            }

            p1 += garden.length * gardenFences;
            p2 += garden.length * gardenCorners;
        }
    }
}

console.log(p1);
console.log(p2);