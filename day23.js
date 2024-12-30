const fs = require('node:fs');
const links = fs.readFileSync(require('path').join(__dirname, 'inputs', `${require('path').basename(__filename, '.js')}.txt`), 'utf8').split(/\r?\n/).map(link => link.split('-'));

const map = [];

links.forEach(([key, value]) => {
  if (!map[key]) {
    map[key] = [];
  }
  map[key].push(value);

  if (!map[value]) {
    map[value] = [];
  } else if (!Array.isArray(map[value])) {
    map[value] = [map[value]];
  }
  map[value].push(key);
});

//p1
let triplets = [];

for (const pc in map) {
  const link = map[pc];
  link.forEach(l => {
    if (!map[l]) {
      return;
    }

    map[l].forEach(ml => {
      if (map[ml] && map[ml].includes(pc)) {
        triplets.push([pc, l, ml]);
      }
    })
  })
}

triplets = Array.from(
  new Set(triplets.map(a => JSON.stringify(a.sort()))),
  e => JSON.parse(e)
);

console.log(triplets.filter(triple => triple.some(tri => tri.startsWith('t'))).length);

//p2
//referenced from chatgpt
function bronKerbosch(R, P, X, graph, cliques) {
  if (P.size === 0 && X.size === 0) {
    cliques.push([...R]);
    return;
  }

  for (let v of P) {
    let newR = new Set(R);
    newR.add(v);

    let newP = new Set();
    let newX = new Set();

    for (let neighbor of graph[v]) {
      if (P.has(neighbor)) newP.add(neighbor);
      if (X.has(neighbor)) newX.add(neighbor);
    }

    bronKerbosch(newR, newP, newX, graph, cliques);

    P.delete(v);
    X.add(v);
  }
}

const cliques = [];
bronKerbosch(new Set(), new Set(Object.keys(map)), new Set(), map, cliques);

console.log(cliques.reduce((max, clique) => clique.length > max.length ? clique : max, []).sort().join(','));