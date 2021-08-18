// 分治法

// 主定理
// T(n) = aT(n/b) + f(n) => T(n) = 0(n ** Math.logb(a)) + 可忽略项目

// 解决步骤
// 1. divide
// 2. conquer
// 3. combine

// 最大连续子数组
// https://leetcode-cn.com/problems/maximum-subarray/
var maxSubArray = function (nums) {
  return max_sub_array(nums, 0, nums.length - 1);
};

var max_cross_array = function (arr, low, high) {
  var mid = (low + high) >> 1;

  var left_max_sum = -Infinity;
  var sum = 0;
  for (let i = mid; i >= 0; i--) {
    sum = sum + arr[i];
    if (sum > left_max_sum) {
      left_max_sum = sum;
    }
  }

  var right_max_sum = -Infinity;
  sum = 0;
  for (let j = mid + 1; j <= high; j++) {
    sum = sum + arr[j];

    if (sum > right_max_sum) {
      right_max_sum = sum;
    }
  }

  var max_sum = right_max_sum + left_max_sum;
  return max_sum;
};

var max_sub_array = function (arr, low, high) {
  if (low === high) {
    return arr[low];
  }

  var mid = (low + high) >> 1;
  var left_max_sum = max_sub_array(arr, low, mid);
  var right_max_sum = max_sub_array(arr, mid + 1, high);
  var cross_max_sum = max_cross_array(arr, low, high);

  if (left_max_sum >= right_max_sum && left_max_sum >= cross_max_sum) {
    return left_max_sum;
  } else if (right_max_sum >= left_max_sum && right_max_sum >= cross_max_sum) {
    return right_max_sum;
  } else {
    return cross_max_sum;
  }
};

// 最大连续子数组 暴力求解

function sum(arr, low, high) {
  let sum = 0;
  for (let i = low; i < high; i++) {
    sum = sum + arr[i];
  }
  return sum;
}

function max_sub_array_force(arr) {
  let max_sum = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      let current_sum = sum(arr, i, j);
      if (max_sum < current_sum) {
        max_sum = current_sum;
      }
    }
  }
  return max_sum;
}

var arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
// maxSubArray(arr, 0, arr.length - 1);
// max_sub_array_force(arr);

// 矩阵乘法
function square_martix_multiply(A, B) {
  var row = A.length;
  var c = [];
  for (let i = 0; i < row; i++) {
    c[i] = null;
    for (let j = 0; i < row; j++) {
      c[i].push([]);
      c[i][j] = 0;
      for (let k = 0; k < row; k++) {
        c[i][j] = c[i][j] + a[i][k] * a[k][j];
      }
    }
  }
  return c;
}
// 矩阵乘法 strassen算法
// 线代的矩阵的拆分不太明白
//@todo
function strassen_martix() {}
