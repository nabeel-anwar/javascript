let arr = [1, 6, 2, 4, 8, 7, 3];
let arr1 = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 15, 18]; //Sorted Arrays
let newArr = [];

let startIndex = 0;
let endIndex = arr1.length - 1;
let mid = Math.trunc((startIndex + endIndex) / 2);
let st = true;

for (const a of arr1) {
  if (startIndex === mid && endIndex === mid) {
    newArr[mid] = a;
    break;
  }
  if (st) {
    newArr[startIndex] = a;
    startIndex++;
    st = false;
  } else {
    newArr[endIndex] = a;
    endIndex--;
    st = true;
  }
}
console.log('Sorting');
console.log(newArr);
