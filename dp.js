var lengthOfLIS = function (nums) {
  var getLen = function (nums, i) {
    var len = 1;
    if (nums.length - 1 === i) {
      return 1;
    }
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] > nums[i]) {
        len = Math.max(getLen(nums.slice(i + 1, nums.length), i + 1) + 1, len);
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

lengthOfLIS([0, 1, 0, 3, 2, 3]);
