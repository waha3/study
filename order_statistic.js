// find min
function minimum(A) {
  var min = A[0];
  for (let i = 1; i < A.length; i++) {
    if (A[i] < min) {
      min = A[i];
    }
  }
  return min;
}

// find min and max
// 只需要比较3n/2次
function min_and_max(A) {
  var min;
  var max;
  var start;
  // 偶数的时候
  if (A.length % 2 === 0) {
    min = A[0];
    max = A[1];
    start = 3;
  } else {
    min = A[0];
    max = A[0];
    start = 2;
  }

  for (let i = start; i < A.length; i++) {
    if (A[i] > A[i - 1]) {
      if (A[i] > max) {
        max = A[i];
      }
    } else {
      if (A[i] < min) {
        min = A[i];
      }
    }
  }

  return { min, max };
}

// var arr = [2, 3, 1, 9, 3];
// min_and_max(arr);

function exchange(A, i, j) {
  var temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}

function partition(A, p, r) {
  var i = p - 1;
  var x = A[r];

  for (var j = p; j < r; j++) {
    if (A[j] < x) {
      i = i + 1;
      exchange(A, i, j);
    }
  }
  exchange(A, r, i + 1);
  return i + 1;
}

function random_partition(A, p, r) {
  var random = Math.floor(Math.random() * (r - p + 1)) + p;
  exchange(A, random, r);
  return partition(A, p, r);
}

// 随机话选择算法 0(n)
// 返回第k小的元素
function randomied_select(A, p, r, k) {
  if (p === r) {
    return A[p];
  }

  var m = random_partition(A, p, r);

  if (A[m] === A[k]) {
    return A[m];
  }

  if (A[m] > A[k]) {
    return randomied_select(A, p, m - 1);
  } else {
    return randomied_select(A, m + 1, r);
  }
}

function randomied_select_iteration(A, p, r, k) {
  // if (p === r) {
  //   return A[p];
  // }

  // var m = random_partition(A, p, r);

  // if (A[m] === A[k]) {
  //   return A[m];
  // }

  // if (A[m] > A[k]) {
  //   return randomied_select(A, p, m - 1);
  // } else {
  //   return randomied_select(A, m + 1, r);
  // }

  while (r > p) {
    var m = random_partition(A, p, r);

    if (m === k) {
      return A[k];
    }

    if (m > k) {
      r = m - 1;
    } else {
      p = m + 1;
    }
  }
  return A[k];
}

var arr = [2, 5, 3, 0, 2, 3, 0, 3];
// var res = randomied_select(arr, 0, arr.length - 1, 2);
var res = randomied_select_iteration(arr, 0, arr.length - 1, 2);
console.log(res);
