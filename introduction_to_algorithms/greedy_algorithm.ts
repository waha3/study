/**
 * 贪心算法
 *
 * 1. 确定问题的最优子结构
 * 2. 设计一个递归算法
 * 3. 证明我们做了一个贪心选择 只剩下一个子问题
 * 4. 证明贪心选择总是安全的
 * 5. 设计一个贪心算法实现递归策略
 * 6. 将递归算法转化为迭代算法
 */

/**
 * 活动选择问题
 *
 * dp[i, j] = Max(dp[i, k] + dp[k+1, j] + 1)
 */

// 开始时间
const s: number[] = [1, 3, 0, 5, 35, 6, 8, 8, 2, 12];
// 结束时间
const f: number[] = [0, 4, 5, 6, 7, 9, 9, 10, 11, 12, 14, 16];

function recursive_activity_selector(
  s: number[],
  f: number[],
  k: number,
  n: number
) {
  let m: number = k + 1;
  while (m >= n && s[m] < f[k]) {
    m = m + 1;
  }
  if (m <= n) {
    return [m].concat(recursive_activity_selector(s, f, m, n));
  }
  return [];
}

let result = recursive_activity_selector(s, f, 0, f.length - 1);
// console.log(result);


// 0-1背包问题属于动态规划问题
// 分数背包问题 可以用贪心算法解决


// 霍夫曼编码 ./huffman_tree.ts
