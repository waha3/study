// 基于比较的排序

// 插入排序
var insertion_sort = function (nums) {
  for (let j = 1; j < nums.length; j++) {
    var key = nums[j];
    var i = j - 1;

    while (i >= 0 && nums[i] > key) {
      nums[i + 1] = nums[i];
      i = i - 1;
    }
    nums[i + 1] = key;
  }
};

// 优化插入排序 把最坏的情况复杂度变成nlogn
// TODO
var insertion_sort_with_binary_search = function (nums) {
  // 反向查找的数组是一个排好序的数组 可以用二分查找
  var binarySearch = function (arr, p, r, target) {
    var m = (p + r) >> 1;

    if (p === r) {
      return m;
    }

    if (target > arr[m]) {
      binarySearch(arr, m + 1, r, target);
    } else {
      binarySearch(arr, p, m - 1, target);
    }
  };

  for (let j = 1; j < nums.length; j++) {
    var key = nums[j];
    var i = j - 1;

    var m = binarySearch(arr, i, j, arr[j]);
    console.log(m);

    // while (i >= m && nums[i] > key) {
    //   nums[i + 1] = nums[i];
    //   i = i - 1;
    // }
    // nums[i + 1] = key;
  }
};

var arr = [10, 2, 7, 1, 5, 3, 9];

// insertion_sort(arr);
insertion_sort_with_binary_search(arr);

// 基于链表的插入
// https://leetcode-cn.com/problems/insertion-sort-list/

var insertionSortList = function (head) {
  // 先转成数组
  var arr = [];

  while (head.next) {
    arr.push(head.val);
    head = head.next;
  }
  arr.push(head.val);
  // 清空
  head = null;

  // 排序
  sortArray(arr);

  // 再转成链表

  var Node = function (val) {
    this.val = val;
    this.next = null;
  };

  var i = 0;
  var cur = null;

  while (i < arr.length) {
    var node = new Node(arr[i]);
    if (!head) {
      head = node;
      cur = head;
    } else {
      cur.next = node;
      cur = cur.next;
    }
    i = i + 1;
  }
  return head;
};

// 归并排序
function merge(arr, p, q, r) {
  var n1 = q - p + 1;
  var n2 = r - q;

  // 初始化数组预留一个哨兵位置
  var left = new Array(n1 + 1);
  var right = new Array(n2 + 1);

  // 给分治的数组赋值
  for (let i = 0; i < n1; i++) {
    left[i] = arr[i + p];
  }
  left[n1] = Infinity;

  for (let j = 0; j < n2; j++) {
    right[j] = arr[j + q + 1];
  }
  right[n2] = Infinity;

  let i = 0;
  let j = 0;

  // 合并数组
  for (let k = p; k <= r; k++) {
    if (left[i] <= right[j]) {
      arr[k] = left[i];
      i = i + 1;
    } else {
      arr[k] = right[j];
      j = j + 1;
    }
  }
}

// 不使用哨兵的merge
function no_soldier_merge(arr, p, q, r) {
  var n1 = q - p + 1;
  var n2 = r - q;

  var left = new Array(n1);
  var right = new Array(n2);

  // 给分治的数组赋值
  for (let i = 0; i < n1; i++) {
    left[i] = arr[i + p];
  }

  for (let j = 0; j < n2; j++) {
    right[j] = arr[j + q + 1];
  }

  let i = 0;
  let j = 0;

  // 合并数组
  for (let k = p; k <= r; k++) {
    // 过界
    if (i === n1) {
      arr[k] = right[j];
      j = j + 1;
      continue;
    }

    if (j === n2) {
      arr[k] = left[i];
      i = i + 1;
      continue;
    }

    if (left[i] <= right[j]) {
      arr[k] = left[i];
      i = i + 1;
    } else {
      arr[k] = right[j];
      j = j + 1;
    }
  }
}

// var arr = [2, 4, 5, 7, 8, 9, 1, 2, 3, 6];
// no_soldier_merge(arr, 0, 5, arr.length - 1);
// merge(arr, 0, 5, arr.length - 1);
// console.log(arr);

function mergeSort(arr, p, r) {
  if (p < r) {
    var m = (p + r) >> 1;
    mergeSort(arr, p, m);
    mergeSort(arr, m + 1, r);
    merge(arr, p, m, r);
  }
}

// var merge_sort_arr = [1, 100, 22, 3];
// mergeSort(merge_sort_arr, 0, merge_sort_arr.length - 1);
// console.log(merge_sort_arr);

// 冒泡排序
function bubbleSort(arr) {
  function exchange(arr, p, q) {
    let temp = arr[p];
    arr[p] = arr[q];
    arr[q] = temp;
  }
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i - 1] > arr[j]) {
        exchange(arr, i - 1, j);
      }
    }
  }
}

// var arr = [3, 10, 1, 8, 2]
// bubbleSort(arr);
// console.log(arr);

// 堆排序
// 见 ./heap.js

// 快速排序
function quick_sort(A, p, r) {
  if (r > p) {
    var m = partition(A, p, r);
    quick_sort(A, p, m - 1);
    quick_sort(A, m + 1, r);
  }
}

function exchange(A, i, j) {
  var temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}

// 本质上式将需要排序的数组分为4个区域
function partition(A, p, r) {
  // 主元
  var x = A[r];
  // 代表小于主原的区域
  var i = p - 1;
  // 代表大于主原的区域

  for (var j = p; j <= r - 1; j++) {
    if (A[j] <= x) {
      i = i + 1;
      exchange(A, i, j);
    }
  }
  exchange(A, r, i + 1);
  return i + 1;
}

// 实现一个随机化版本 统计上使得快排序的算法复杂度不是最坏情况变高
function random_partition(A, p, r) {
  var i = Math.floor(Math.random() * (r - p + 1)) + p;
  exchange(A, i, r);
  return partition(A, p, r);
}

function random_quick_sort(A, p, r) {
  if (r > p) {
    var m = random_partition(A, p, r);
    random_quick_sort(A, p, m - 1);
    random_quick_sort(A, m + 1, r);
  }
}

// 尾递归优化
// 尾递归的本质其实就是一个 迭代版本只不过编译器帮我们做了优化
// chrome中尾递归目前是不可用的状态
function tail_resursive_quick_sort(A, p, r) {
  while (p < r) {
    var m = partition(A, p, r);
    tail_resursive_quick_sort(A, p, m - 1);
    p = m + 1;
  }
}

// var arr = [2, 8, 7, 1, 3, 5, 6, 4];
// quick_sort(arr, 0, arr.length - 1);
// random_quick_sort(arr, 0, arr.length - 1);
// tail_resursive_quick_sort(arr, 0, arr.length - 1);
// console.log(arr);

// 基于运算的排序

// 计数排序
// 主要适用于n个输入元素0到k总有 当k=O(n) => 0(n) = n;
function counting_sort(A, B, k) {
  var C = new Array(k);
  // 记位的数组初始化为0
  for (let i = 0; i <= k; i++) {
    C[i] = 0;
  }

  // 统计各个元素出现的次数
  for (let i = 0; i < A.length; i++) {
    C[A[i]] = C[A[i]] + 1;
  }

  // 统计对于某个元素i 前面有多少元素小于i
  for (let i = 1; i <= k; i++) {
    C[i] = C[i - 1] + C[i];
  }

  for (let i = 0; i < A.length; i++) {
    B[C[A[i]]] = A[i];
    C[A[i]] = C[A[i]] - 1;
  }
}

// 基数排序
// 逐位比较
function radix_sort(A, d) {
  for (let i = 1; i <= d; i++) {
    // use some stable sort
  }
}

// 桶排序
// 将[0, 1)均匀的分布这样他的复杂度期望就是O(n)
function node(val) {
  this.val = val;
  this.next = null;
}

function link_list() {
  this.head = null;
  this.tail = null;
  this.insert = function () {};
}

function bucket_sort(A) {
  var n = A.length;
  var B = new Array(n);
  for (let i = 0; i < n; i++) {
    B[i] = new link_list();
  }

  for (let i = 0; i < n; i++) {
    if (A[i] >= i / 10 && A[i] < (i + 1) / 10) {
      B[i].insert(new node(A[i]));
    }
  }

  for (let i = 0; i < n; i++) {
    insertion_sort(B[i]);
  }
}

// var arr = [2, 5, 3, 0, 2, 3, 0, 3];
// var k = 5;
// var b = new Array(k + 1)
// counting_sort(arr, b, k);
// console.log(b);
