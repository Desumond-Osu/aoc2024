const fs = require('node:fs');
let [values, gates] = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split(/\r?\n\r?\n/);

values = Object.fromEntries(values.split(/\r?\n/).map(row => row.split(': ')));
gates = gates.split(/\r?\n/).map(row => {
    const [gate, output] = row.split(' -> ');
    return [gate.split(' '), output];
});

while (gates.length > 0) {
    for (let i = gates.length - 1; i >= 0; i--) {
        if (values[gates[i][0][0]] !== undefined && values[gates[i][0][2]] !== undefined) {
            switch (gates[i][0][1]) {
                case 'XOR': values[gates[i][1]] = values[gates[i][0][0]] ^ values[gates[i][0][2]]; break;
                case 'AND': values[gates[i][1]] = values[gates[i][0][0]] & values[gates[i][0][2]]; break;
                case 'OR' : values[gates[i][1]] = values[gates[i][0][0]] | values[gates[i][0][2]]; break;
            }

            gates.splice(i, 1);
        }
    }
}

const binaryString = Object.entries(values)
    .filter(([key]) => key.startsWith('z'))
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([, value]) => value)
    .join('');

console.log(parseInt(binaryString, 2));