// https://leetcode-cn.com/problems/longest-increasing-subsequence/
/**
 * 自顶向下解法
 */
var lengthOfLIS = function (nums) {
  var memorize = {};
  var getLen = function (nums, i) {
    var len = 1;

    if (memorize[i]) {
      return memorize[i];
    }

    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] > nums[i]) {
        let res = getLen(nums, j);
        memorize[j] = res;
        len = Math.max(getLen(nums, j) + 1, len);
      }
    }
    return len;
  };

  let max_len = 1;
  for (let i = 0; i < nums.length; i++) {
    max_len = Math.max(getLen(nums, i), max_len);
  }
  return max_len;
};

/**
 * 自底向下的解法
 *
 * @todo
 */

var lengthOfLIS = function (nums) {
  var dp = new Array(nums.length);
  dp.fill(1);

  for (let i = 0; i < nums.length; i++) {}
};

/**
 * https://leetcode-cn.com/problems/maximum-subarray/
 */
var maxSubArray = function (nums) {
  var getSum = function (nums, i) {
    let sum = 0;
    if (nums.length - 1 === i) {
      return nums[i];
    }

    if (nums[i] < 0) {
      sum = Math.max(getSum(nums, i + 1), sum);
    } else {
      sum = getSum(nums, i + 1) + nums[i];
    }
    return sum;
  };

  let sum_max = getSum(nums, 0);
  return sum_max;
};

maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
