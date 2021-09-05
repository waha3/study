/**
 * 动态规划
 *
 */

/**
 * 求矩阵链相乘的问题
 *
 * c[i, j] = min(c[i, k] + c[k+1, j] + p[i]*p[k+1]*p[j])
 */
function memoize_matrix_multiply_chain() {
  const p: number[] = [30, 35, 15, 5, 10, 20, 25];
  const n: number = p.length;
  const m = new Array(n);
  for (let i = 0; i < n; i++) {
    m[i] = new Array(n);
    for (let j = 0; j < n; j++) {
      m[i][j] = Infinity;
    }
  }
  return matrix_multiply_chain(p, 1, 5, m);
}
function matrix_multiply_chain(
  p: number[],
  i: number,
  j: number,
  m: number[][]
): number {
  if (m[i][j] < Infinity) {
    return m[i][j];
  }
  // 当矩阵链是单个数组的时候不要分割
  if (i === j) {
    return 0;
  }

  for (let l: number = i; l < j; l++) {
    let q =
      matrix_multiply_chain(p, i, l, m) +
      matrix_multiply_chain(p, l + 1, j, m) +
      p[i - 1] * p[l] * p[j];
    if (q < m[i][j]) {
      m[i][j] = q;
    }
  }
  return m[i][j];
}

function matrix_chain_order(p: number[]) {
  let n = p.length - 1;
  let m = new Array(n);
  let s = new Array(n);

  for (let i = 0; i < n; i++) {
    m[i] = new Array(n);
    s[i] = new Array(n);
    for (let j = 0; j < n; j++) {
      if (i === j) {
        m[i][j] = 0;
      } else {
        m[i][j] = Infinity;
      }
    }
  }

  // l is chain length
  for (let l: number = 2; l <= n; l++) {
    for (let i: number = 0; i <= n - l + 1; i++) {
      let j = i + l - 1;
      for (let k = i; k <= j - 1; k++) {
        let q: number = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];
        if (q < m[i][j]) {
          m[i][j] = q;
          s[i][j] = k;
        }
      }
    }
  }
  return {
    m,
    s,
  };
}

// let result = memoize_matrix_multiply_chain();
// console.log(result);
// const p: number[] = [30, 35, 15, 5, 10, 20, 25,];
// matrix_chain_order(p);

/**
 * 最长公共子序列
 * 子序列（不要连续的和子串有区别）
 * 前缀：给定一个序列 X={x1, x2, .., xm} 对于n=1,2,...m 定义X的第i前缀位{x1..,xi}
 */

// TODO lcs 暴力法
function lcs_brute(X: string, Y: string) {}

/**
 * X = {x(1), x(2),...,x(m)}
 * Y = {y(1), y(2),...,y(n)}
 * 如果x(m) = y(n) => lcs(x, y) = lcs(x(m - 1), y(n - 1)) + 1
 * 如果x(m) != y(n) => lcs(x, y) = max(lcs(x(m-1), y(n)), lcs(x(m), y(n-1)) )
 *
 */
function lcs_recursive(
  X: string,
  Y: string,
  m: number,
  n: number,
  C: number[][]
): number {
  if (C[m][n] >= 0) {
    return C[m][n];
  }

  if (m === 0 || n === 0) {
    return 0;
  }

  // 按索引取要减去1
  if (X[m - 1] === Y[n - 1]) {
    C[m][n] = lcs_recursive(X, Y, m - 1, n - 1, C) + 1;
  } else {
    C[m][n] = Math.max(
      lcs_recursive(X, Y, m - 1, n, C),
      lcs_recursive(X, Y, m, n - 1, C)
    );
  }
  return C[m][n];
}

function lcs_bottom_up(X: string, Y: string): { C: number[][]; S: string[][] } {
  let m: number = X.length;
  let n: number = Y.length;
  let C: number[][] = new Array(m + 1);
  let S: string[][] = new Array(m + 1);

  for (let i = 0; i <= m; i++) {
    C[i] = new Array(n + 1);
    C[i][0] = 0;
    S[i] = new Array(n + 1);
    S[i][0] = "";
  }

  for (let j = 0; j <= n; j++) {
    C[0][j] = 0;
    S[0][j] = "";
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (X[i - 1] === Y[j - 1]) {
        C[i][j] = C[i - 1][j - 1] + 1;
        S[i][j] = "↖";
      } else {
        if (C[i - 1][j] > C[i][j - 1]) {
          C[i][j] = C[i - 1][j];
          S[i][j] = "←";
        } else {
          C[i][j] = C[i][j - 1];
          S[i][j] = "↑";
        }
      }
    }
  }

  return {
    C,
    S,
  };
}

// TODO 优化到空间复杂度到O(2min(m,n))
function lcs_bottom_up_optimsize(X: string, Y: string) {
  // 内部默认是m较长的字符串
  let m: number = X.length;
  let n: number = Y.length;
  let C: number[][] = new Array(2);
  let k = 0;

  for (let i = 0; i < 2; i++) {
    C[i] = new Array(n + 1);
    C[i][0] = 0;
  }

  for (let j = 0; j <= n; j++) {
    C[0][j] = 0;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (X[i - 1] === Y[j - 1]) {
        C[i - k][j] = C[i - 1 - k][j - 1] + 1;
      } else {
        if (C[i - 1 - k][j] > C[i - k][j - 1]) {
          C[i - k][j] = C[i - 1 - k][j];
        } else {
          C[i - k][j] = C[i - k][j - 1];
        }
      }
    }
    k = k + 1;
  }

  return C;
}

function print_lcs(S: string[][], X: string, i: number, j: number) {
  if (i === 0 || j === 0) {
    return;
  }

  if (S[i][j] === "↖") {
    print_lcs(S, X, i - 1, j - 1);
    console.log(X[i - 1]);
  } else if (S[i][j] === "←") {
    print_lcs(S, X, i - 1, j);
  } else if (S[i][j] === "↑") {
    print_lcs(S, X, i, j - 1);
  }
}

// let X = "abcbdab";
// let Y = "bdcaba";
// let m = X.length;
// let n = Y.length;
// let C = new Array(m + 1);
// for (let i = 0; i <= m; i++) {
//   C[i] = new Array(n + 1);
//   for (let j = 0; j <= n; j++) {
//     C[i][j] = -1;
//   }
// }
// let result = lcs_recursive(X, Y, m, n, C);
// console.log(result);
// let { S } = lcs_bottom_up(X, Y);
// print_lcs(S, X, m, n);
// lcs_bottom_up_optimsize(X, Y);

/**
 * n个数的序列最长单调递增子序列
 * X = {x(1),x(2),...x(m)}
 * x(m) > x(m - 1) => lis(X(m)) = lis(X(m - 1)) + 1
 * x(m) <= x(m - 1) => lis(x(m)) = lis(x(m - 1))
 */
interface lis {
  length: number;
}

// TODO
function lis<T extends lis>(X: T): number {
  let m = X.length;
  let C = new Array(m + 1);

  for (let i = 0; i <= m; i++) {
    C[i] = new Array(m + 1);
    C[i][0] = 1;
  }

  for (let j = 0; j <= m; j++) {
    C[0][j] = 1;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= m; j++) {
      if (X[i] > X[j - 1]) {
        C[i][j] = C[i - 1][j - 1] + 1;
      } else {
        C[i][j] = Math.max(C[i - 1][j], C[i][j - 1]);
      }
    }
  }
  return C[m][m];
}

function lis_recursive<T extends lis>(X: T, i: number, j: number): number {
  if (i === 0) {
    return 1;
  }

  if (X[i] > X[j]) {
    return lis_recursive(X, i - 1, j + 1) + 1;
  } else {
    return lis_recursive(X, i - 1, j - 1);
  }
}

// let X = [10, 9, 2, 5, 3, 7, 101, 18];
// lis<number[]>(X);
// let result = lis_recursive<number[]>(X, X.length - 1);
// console.log(result);

/**
 * 最优二叉搜索树（和前面矩阵链类似）
 */

/**
 * 最长回文子序列
 * 回文：正序和逆序相同的非空字符串
 */
