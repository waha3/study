// // https://leetcode-cn.com/problems/longest-increasing-subsequence/
// /**
//  * 自顶向下解法
//  */
// var lengthOfLIS = function (nums) {
//   var memorize = {};
//   var getLen = function (nums, i) {
//     var len = 1;

//     if (memorize[i]) {
//       return memorize[i];
//     }

//     for (let j = i + 1; j < nums.length; j++) {
//       if (nums[j] > nums[i]) {
//         let res = getLen(nums, j);
//         memorize[j] = res;
//         len = Math.max(getLen(nums, j) + 1, len);
//       }
//     }
//     return len;
//   };

//   let max_len = 1;
//   for (let i = 0; i < nums.length; i++) {
//     max_len = Math.max(getLen(nums, i), max_len);
//   }
//   return max_len;
// };

// /**
//  * 自底向下的解法
//  *
//  * TODO
//  */

// var lengthOfLIS = function (nums) {
//   var dp = new Array(nums.length);
//   dp.fill(1);

//   for (let i = 0; i < nums.length; i++) {}
// };

// /**
//  * https://leetcode-cn.com/problems/maximum-subarray/
//  */
// var maxSubArray = function (nums) {
//   var getSum = function (nums, i) {
//     let sum = 0;
//     if (nums.length - 1 === i) {
//       return nums[i];
//     }

//     if (nums[i] < 0) {
//       sum = Math.max(getSum(nums, i + 1), sum);
//     } else {
//       sum = getSum(nums, i + 1) + nums[i];
//     }
//     return sum;
//   };

//   let sum_max = getSum(nums, 0);
//   return sum_max;
// };

// // maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);

// var longestPalindrome = function (s) {
//   var memoize = {};

//   var get_singal_max = function (s, i) {
//     let child_palindrow = "";

//     if (i === s.length - 1) {
//       return s[s.length - 1];
//     }

//     for (let j = i + 1; j < s.length; j++) {
//       let child = get_singal_max(s, j);

//       if (child[child.length - 1] === s[i]) {
//         child_palindrow = s[j] + child;
//       }
//     }

//     return child_palindrow;
//   };

//   let max_palindrow = "";

//   for (let i = 0; i < s.length; i++) {
//     if (max_palindrow.length < get_singal_max(s, i).length) {
//       max_palindrow = get_singal_max(s, i);
//     }
//   }

//   return max_palindrow;
// };

// longestPalindrome("bab");
// // https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
// var lengthOfLongestSubstring = function (s) {
//   var getChildMaxLength = function (s, i) {
//     if (s.length - 1 === i) {
//       return 1;
//     }

//     let childMaxLen = getChildMaxLength(s, i + 1);

//     for (let j = i + 1; j < s.length; j++) {
//       for (let k = j + 1; k < j + childMaxLen; k++) {
//         if (s[j] === s[k]) {
//           return Math.max(childMaxLen, s.length - 1 - i - childMaxLen);
//         }
//       }
//     }

//     return childMaxLen + 1;
//   };

//   var len = 0;

//   if (!s) {
//     return len;
//   }

//   len = getChildMaxLength(s, 0);
//   return len;
// };

// lengthOfLongestSubstring("pwwkew");

/**
 * 动态规划（最优化问题）
 *
 * 1.刻画一个最优解的结构特征
 * 2.递归的定义最优解的值
 * 3.计算最优解的值（通常采用自底向上的方法）
 * 4.利用计算出来的信息构造一个最优解
 *
 * 最优子结构：问题的最优解由相关的子问题子问题合成而成，且这些问题可以独立求解
 *
 * 子问题图 动态规划算法的规模是和图的顶点和边呈线性的关系
 */

/**
 * 钢条切割问题
 * Rn = Max(Pn + R0,  R1 + R(n - 1), R2 + R(n - 2),..., R(n - 1) + R1)
 * 自顶向下
 */

function cut_rod(n, p) {
  if (n === 0) {
    return 0;
  }
  var r = -Infinity;
  for (let i = 1; i <= n; i++) {
    r = Math.max(r, p[i] + cut_rod(n - i, p));
  }
  return r;
}

/**
 * 带备忘录的自顶向下
 */
function memoize_cut_rod(n, p) {
  var arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = -Infinity;
  }
  return memoize_cut_rod_aux(n, p, arr);
}

function memoize_cut_rod_aux(n, p, arr) {
  if (arr[n] >= 0) {
    return arr[n];
  }
  var r = null;
  if (n === 0) {
    r = 0;
  } else {
    r = -Infinity;
    for (let i = 1; i <= n; i++) {
      r = Math.max(r, p[i] + memoize_cut_rod_aux(n - i, p, arr));
    }
  }
  arr[n] = r;
  return r;
}

/**
 * 自底像上
 */
function bottom_up_cut_rod(n, p) {
  var arr = new Array(n);
  arr[0] = 0;
  var r = -Infinity;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      r = Math.max(r, p[j] + arr[i - j]);
    }
    arr[i] = r;
  }
  return r;
}

function expand_bottom_up_cut_rod(n, p) {
  var arr = new Array(n);
  arr[0] = 0;
  var r = -Infinity;
  // 解决方案
  var s = [];

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      if (r < p[j] + arr[i - j]) {
        r = p[j] + arr[i - j];
        s[i] = j;
      }
    }
    arr[i] = r;
  }
  return {
    r,
    s,
  };
}

function print_cut_rod_solution(n, p) {
  var { r, s } = expand_bottom_up_cut_rod(n, p);
  while (n > 0) {
    console.log(s[n]);
    n = n - s[n];
  }
}

function print_memoize_cut_rod(n, p) {
  var arr = new Array(n);
  var s = new Array(n);

  for (let i = 0; i < n; i++) {
    arr[i] = -Infinity;
  }
  var r = memoize_cut_rod_aux_with_solution(n, p, arr, s);

  while (n > 0) {
    console.log(s[n]);
    n = n - s[n];
  }
}

function memoize_cut_rod_aux_with_solution(n, p, arr, s) {
  var r;

  if (arr[n] >= 0) {
    return arr[n];
  }

  if (n === 0) {
    r = 0;
  } else {
    r = -Infinity;
    for (let i = 1; i <= n; i++) {
      var child_r = memoize_cut_rod_aux_with_solution(n - i, p, arr, s);
      if (r < child_r + p[i]) {
        r = child_r + p[i];
        s[n] = i;
      }
    }
  }
  arr[n] = r;

  return r;
}

// var p = [-1, 1, 5, 8, 9, 10, 17, 17, 20, 24, 30];
// var r = memoize_cut_rod(10, p);
// var r = bottom_up_cut_rod(10, p);
// console.log(r);
// print_cut_rod_solution(10, p);
// print_memoize_cut_rod(7, p);

/**
 * 矩阵相乘
 */

function matrix_multiply(A, B) {
  A.rows = A.length;
  A.columns = A[0].length;
  B.rows = B.length;
  B.columns = B[0].length;

  if (A.columns !== B.rows) {
    throw error("imcompatibale dimension");
  }

  var C = new Array(A.rows);
  for (let i = 0; i < A.rows; i++) {
    C[i] = [];
    for (let j = 0; j < B.columns; j++) {
      C[i][j] = 0;
      for (let k = 0; k < A.columns; k++) {
        C[i][j] = C[i][j] + A[i][k] * B[k][j];
      }
    }
  }
  return C;
}

// var A = [
//   [1, 2],
//   [2, 3],
//   [3, 4],
// ];
// var B = [
//   [1, 2, 3, 4],
//   [2, 3, 4, 5],
// ];
// [
//   [5, 8, 11, 14],
//   [8, 13, 18, 23],
//   [11, 18, 25, 32],
// ];
// matrix_multiply(A, B);

/**
 *
 * 矩阵乘法链问题（一种括号化方案使得使得标量的乘法最少）
 * m[i~j] = m[i~k] + m[k+1~j] + P(i-1) * Pk * Pj (1<=i<=j<=n)
 */
function matrix_chain_order(p) {
  var n = p.length - 1;
  var m = new Array(n);
  var s = new Array(n);

  for (let i = 0; i < n; i++) {
    m[i] = new Array(n);
    s[i] = new Array(n);
  }

  for (let i = 0; i < n; i++) {
    // 对于矩阵链中只有一个矩阵时标量乘法为0
    m[i][i] = 0;
  }

  // l是链的长度
  // for (let l = 2; l <= n; l++) {
  //   for (let i = 0; i <= n - l + 1; i++) {
  //     j = i + l - 1;
  //     m[i][j] = Infinity;
  //     for (let k = i; k <= j - 1; k++) {
  //       q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];
  //       if (q < m[i][j]) {
  //         m[i][j] = q;
  //         s[i][j] = k;
  //       }
  //     }
  //   }
  // }

  for (let l = 2; l <= n; l++) {}
  return {
    m,
    s,
  };
}

function matrix_chain_recursive(p) {
  var n = p.length - 1;
  if (n === 1) {
    return p;
  }
}

var p = [30, 35, 15, 5, 10, 20, 25];
var result = matrix_chain_order(p);
console.log(result);
