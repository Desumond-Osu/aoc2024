const fs = require('node:fs');
let [map, sequence] = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split(/\r?\n\r?\n/);

let mapP1 = map.split(/\r\n/).map(val => val.split(''));
let mapP2 = map.split(/\r\n/).map(row => row.replace(/\#/g, '##').replace(/O/g, '[]').replace(/\./g, '..').replace(/\@/g, '@.').split(''));

sequence = sequence.split(/\r?\n/).join('').split('');

const directions = {
    '<': [0, -1],
    '^': [-1, 0],
    '>': [0, 1],
    'v': [1, 0]
};

for (let part of ['p1', 'p2']) {
    let map = part == 'p1' ? mapP1 : mapP2;

    let [startX, startY] = map.reduce((acc, line, index) => {
        const charIndex = line.indexOf('@');
        if (charIndex !== -1) {
          acc.push(index, charIndex);
        }
        return acc;
    }, []);
    
    sequence.forEach(dir => {
        let queue = [ [[startX, startY]] ];
    
        while (true) {
            let rowQueue = queue.at(-1);
            let tempQueue = new Set();
    
            for (const [x, y] of rowQueue) {
                if ((map[x][y] == '[' && dir == '>') || (map[x][y] == ']' && dir == '<')) {
                    continue;
                }
    
                let [nx, ny] = [x + directions[dir][0], y + directions[dir][1]];
    
                switch (map[nx][ny]) {
                    case '#': return;
                    case '[': 
                        tempQueue.add(JSON.stringify([nx, ny]));
                        tempQueue.add(JSON.stringify([nx + directions['>'][0], ny + directions['>'][1]]));
                        break;
                    case ']':
                        tempQueue.add(JSON.stringify([nx, ny]));
                        tempQueue.add(JSON.stringify([nx + directions['<'][0], ny + directions['<'][1]]));
                        break;
                    case 'O':
                        tempQueue.add(JSON.stringify([nx, ny]));
                        break;
                }
            }
    
            if (tempQueue.size == 0) { // if all of them are '.'
                break;
            }
    
            queue.push(Array.from(tempQueue, JSON.parse));
        }
    
        queue = queue.flat();
    
        for (i = queue.length - 1; i >= 0; i--) {
            let [x, y] = queue[i];
    
            let [nx, ny] = [x + directions[dir][0], y + directions[dir][1]];
            map[nx][ny] = map[x][y];
    
            if (map[x][y] == '@') {
                [startX, startY] = [nx, ny];
            }
    
            map[x][y] = '.';
        }
    })
    
    const boxes = [];
    
    map.forEach((row, rI) => {
        row.forEach((col, cI) => {
            if ((part == 'p1' && col == 'O') || (part == 'p2' && col == '[')) {
                boxes.push([rI, cI]);
            }
        });
    });
    
    console.log(boxes.reduce((acc, val) => acc + val[0] * 100 + val[1], 0));
}