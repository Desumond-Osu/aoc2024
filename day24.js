const fs = require('node:fs');
let [values, gates] = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split(/\r?\n\r?\n/);

values = Object.fromEntries(values.split(/\r?\n/).map(row => row.split(': ')));
gates = gates.split(/\r?\n/).map(row => row.split(' -> ').join(' ').split(' '));
let copiedGates = [...gates];

//p1
while (gates.length > 0) {
    for (let i = gates.length - 1; i >= 0; i--) {
        let [pin1, op, pin2, out] = gates[i];
        if (values[pin1] !== undefined && values[pin2] !== undefined) {
            switch (op) {
                case 'XOR': values[out] = values[pin1] ^ values[pin2]; break;
                case 'AND': values[out] = values[pin1] & values[pin2]; break;
                case 'OR': values[out] = values[pin1] | values[pin2]; break;
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

//p2 - referenced from https://gist.github.com/p-a/0c3b7d9bc2afc6438751daed5712c284
//i have no idea how it works
const sortedGates = copiedGates.map(([pin1, op, pin2, out]) => [out, op, pin1, pin2]);
const badWires = [];

for (const gate of sortedGates) {
    const [out, op, ...pins] = gate;

    if (out.startsWith("z") && op != "XOR" && out != "z45") {
        badWires.push(out);
        continue;
    }

    if (!out.startsWith("z") && op == "XOR" && pins.every(([p]) => p != "x" && p != "y")) {
        badWires.push(out);
        continue;
    }

    if (op == "XOR" && sortedGates.some(([_, op2, ...pins2]) => pins2.includes(out) && op2 == "OR")) {
        badWires.push(out);
        continue;
    }

    if (op == "AND" &&
        pins.every(p => p != "x00" && p != "y00") &&
        !sortedGates.some(([_, op2, ...pins2]) => pins2.some(pin => pin == out) && op2 == "OR")
    ) {
        badWires.push(out);
        continue;
    }

    if (op == "OR" &&
        !sortedGates.some(([out2, op2]) => pins.some(pin => pin == out2) && op2 == "AND")
    ) {
        badWires.push(out);
        continue;
    }
}

console.log(badWires.sort().join(","));