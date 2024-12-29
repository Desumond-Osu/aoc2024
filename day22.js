const fs = require('node:fs');
const secrets = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split(/\r?\n/).map(BigInt);

let total = 0n;
let possiblilities = [];
secrets.forEach((secret, index) => {
    let sequence = [secret.toString().slice(-1)];
    possiblilities[index] = new Map;

    for (let i = 0; i < 2000; i++) {
        secret = ((secret * 64n) ^ secret) % 16777216n;
        secret = ((secret / 32n) ^ secret) % 16777216n;
        secret = ((secret * 2048n) ^ secret) % 16777216n;

        sequence.push(secret.toString().slice(-1));

        if (sequence.length >= 5) {
            sequence = sequence.slice(-5);
            let key = `${sequence[1] - sequence[0]},${sequence[2] - sequence[1]},${sequence[3] - sequence[2]},${sequence[4] - sequence[3]}`;

            if (!possiblilities[index].has(key)) {
                possiblilities[index].set(key, +sequence[4]);
            }
        }
    }

    total += secret;
})

//p1
console.log(total);

//p2
const uniqueSequences = new Set();

possiblilities.forEach(map => {
    map.forEach((val, key) => {
        uniqueSequences.add(key);
    })
})

let highestTotal = 0;

uniqueSequences.forEach(seq => {
    let total = 0;

    possiblilities.forEach(map => {
        if (map.has(seq)) {
            total += map.get(seq);
        }
    })

    highestTotal = Math.max(highestTotal, total);
})

console.log(highestTotal);