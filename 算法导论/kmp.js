/**
 * example
 *
 * ababababca
 * abababca
 *
 * [0, 0, 1, 2, 3, 0, 0, 1] >> 1
 * [-1, 0, 0, 1, 2, 3, 4, 0]
 */

/**
 *
 *
 * ababab abca
 *   ababab ca
 * i = 6
 * j = 6
 * next[6 - 1] === 3
 *
 * i = 6
 * j = 3
 *
 *
 * ababababca
 * abababca
 *
 *
 *
 *
 *
 */

/**
 * 第0位默认设置0
 * next的第1位肯定是0
 * 从第二位开始匹配
 * 相当于当前位置的前缀和后缀匹配
 * ababaab
 *  ababaab
 */
var getNext = function (p) {
  var next = [0];
  var i = 1;
  var now = 0;

  while (i < p.length) {
    if (p[i] === p[now]) {
      ++i;
      ++now;
      next[i] = now;
    } else if (now > 0) {
      now = next[now - 1];
    } else {
      next[i] = 0;
      ++i;
    }
  }

  return next;
};

var kmp = function (str, p) {
  var i = 0;
  var j = 0;
  var next = getNext(p);

  while (i < str.length && j < p.length) {
    if (str[i] === p[j]) {
      ++i;
      ++j;
    } else {
      j = next[i];
    }
  }

  if (j === str.length) {
    return j;
  }
  return -1;
};
