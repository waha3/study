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

/**
 * 暴力法
 */
function lcs_bucket() {}