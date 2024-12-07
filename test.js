// Define variables
const x = '6';
const dirX = '1';
const dirY = '-1';

// Create the regular expression dynamically
const searchPattern = new RegExp(`^${x},.* ${dirX},${dirY}$`);

// Create the Set with some example values
const mySet = new Set([
  '8,4 0,-1',
  '8,3 0,-1',
  '4,7 -1,0',
  '5,2 -1,0',
  '4,9 -1,0',
  '6,2 1,-1'
]);

// Convert Set to Array and use .some() to check for a match
const found = [...mySet].find(value => searchPattern.test(value));

if (found) {
    console.log(`Found: ${found}`);
} else {
  console.log("No match found");
}
