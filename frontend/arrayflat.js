function flat(data, depth = 0, arr, fixedDepth) {
  if (Array.isArray(data)) {
    depth = depth + 1;
    for (let i of data) {
      if (depth <= fixedDepth) {
        flat(i, depth, arr, fixedDepth);
      } else {
        arr.push(i);
      }
    }
  } else {
    arr.push(data);
  }
  return arr;
}

Array.prototype.flat = function (depth = 1) {
  return flat(this, 0, [], depth);
};

let arr = [1, 2, 3, [3, 4, [5, 6, [7, 8]]]];
let result = flat(arr, 0, [], 2);
let res = arr.flat(3);
console.log(res);
