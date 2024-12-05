const fs = require('node:fs');
let [pageOrder, pageNo] = fs.readFileSync(`inputs/${__filename.split('/').pop().replace('.js', '')}.txt`, 'utf8').split('\n\n');

pageOrder = pageOrder.split('\n').map(p => p.split('|'));
pageNo = pageNo.split('\n').map(p => p.split(','));

//p1
pageNoCorrect = pageNo;

pageOrder.forEach(po => {
  pageNoCorrect = pageNoCorrect.filter(subArray => {
    const pageOne = subArray.indexOf(po[0]);
    const pageTwo = subArray.indexOf(po[1]);
    
    if (pageOne !== -1 && pageTwo !== -1) {
      return pageOne < pageTwo;
    }
    
    return true;
  });
})

console.log(pageNoCorrect.reduce((acc, arr) => acc + +arr[Math.floor(arr.length / 2)], 0));

//p2
let pageNoWrong = pageNo.filter(pn => 
  !pageNoCorrect.some(pnc => 
    pn.length === pnc.length && pn.every((val, index) => val === pnc[index])
  )
);

let total = 0;

//do few loops until everything is in place
do {
  total = pageNoWrong.reduce((acc, arr) => acc + +arr[Math.floor(arr.length / 2)], 0);

  pageOrder.forEach(po => {
    pageNoWrong = pageNoWrong.map(subArray => {
      const pageOne = subArray.indexOf(po[0]);
      const pageTwo = subArray.indexOf(po[1]);
      
      if (pageOne !== -1 && pageTwo !== -1 && pageOne > pageTwo) {
        subArray.splice(pageOne, 0, subArray.splice(pageTwo, 1)[0]);
      }

      return subArray;
    });
  })

  if (pageNoWrong.reduce((acc, arr) => acc + +arr[Math.floor(arr.length / 2)], 0) === total) {
    break;
  }
} while(1)

console.log(total);