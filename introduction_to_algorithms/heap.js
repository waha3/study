// 最大堆 A
// 性质 高度：Math.ceil(log2n)
// A[parent(i)] >> A[i]
function left(i) {
  return i << 1;
}

function right(i) {
  return (i << 1) + 1;
}

function parent(i) {
  return i >> 1;
}

function exchange(arr, i, j) {
  var temp = arr[i - 1];
  arr[i - 1] = arr[j - 1];
  arr[j - 1] = temp;
}

// 递归版本
// 递归式 t(n) = t(2n/3) + O(1)
// 堆是一个完全二叉树所以左边子树节点数>=右节点
// 底层半满是 假设left 有x个元素 堆元素就是
// 根据等比级数底部的n比上面的节点多1个
//  (x + x + 1) + (x) + 1 = n => 3x + 2
// 2x + 1 / 3x + 2 << 2 / 3

function max_heapify(A, i) {
  var l = left(i);
  var r = right(i);
  var largest = null;

  if (A[l - 1] > A[i - 1] && l <= A.heap_size) {
    largest = l;
  } else {
    largest = i;
  }

  if (A[r - 1] > A[largest - 1] && r <= A.heap_size) {
    largest = r;
  }

  if (largest !== i) {
    exchange(A, i, largest);
    max_heapify(A, largest);
  }
}

// 迭代版本
function max_heapify_iteration(A, i) {
  while (true) {
    var l = left(i);
    var r = right(i);
    var largest = null;

    if (A[l] > A[i] && l <= A.heap_size) {
      largest = l;
    } else {
      largest = i;
    }

    if (A[r] > A[largest] && r <= A.heap_size) {
      largest = r;
    }

    if (largest !== i) {
      exchange(A, i, largest);
      i = largest;
    } else {
      return;
    }
  }
}

// 构建最大堆
function build_max_heap(arr) {
  // heap_size 和 数组容量是互相独立的
  // heap sort 也需要用到这个属性 才能实现原址排序
  var heap_size = arr.length;
  arr.heap_size = heap_size;

  // floor(n/2) + 1 .. n 都是叶节点
  // 证明：假设最左边的节点的left => floor((n/2 + 1)) * 2 > (n / 2 - 1) * 2 => n
  // 所以最左边的节点没有子节点

  var start = heap_size >> 1;
  // 所以开始从叶界点的父节点开始
  for (let i = start; i >= 1; i--) {
    max_heapify(arr, i);
  }
}

// 算法复杂度n * logn的但不是渐进紧缩的 => n
// 证明：@todo

// var arr = [2, 3, 4, 5, 6, 7, 8];
// var arr = [4, 1, 3, 2, 16, 9, 10, 14, 8, 7];
// build_max_heap(arr);
// console.log(arr);

function min_heapify(A, i) {
  var l = left(i);
  var r = right(i);
  var smallest = null;

  if (A[l - 1] < A[i - 1] && l <= A.heap_size) {
    smallest = l;
  } else {
    smallest = i;
  }

  if (A[r - 1] < A[smallest - 1] && r <= A.heap_size) {
    smallest = r;
  }

  if (smallest !== i) {
    exchange(A, i, smallest);
    min_heapify(A, smallest);
  }
}

// 构建最小堆
function build_min_heap(arr) {
  var heap_size = arr.length;
  arr.heap_size = heap_size;
  var start = heap_size >> 1;

  for (let i = start; i >= 1; i--) {
    min_heapify(arr, i);
  }
}

// var arr = [8, 7, 6, 5, 4, 3, 2, 1];
// build_min_heap(arr);
// console.log(arr);

// 堆排序
function heap_sort(A) {
  build_max_heap(A);

  for (let i = A.length; i >= 2; i--) {
    // heap最后一个节点与根节点交换
    exchange(A, 1, i);
    A.heap_size = A.heap_size - 1;
    max_heapify(A, 1);
  }
}

// var arr = [1, 10, 7, 6, 3, 2];
// heap_sort(arr);
// console.log(arr);

// 优先队列

// 最大优先队列
function heap_maximum(A) {
  return A[0];
}

function heap_extract(A) {
  var heap_size = A.heap_size;
  if (heap_size < 1) {
    throw error();
  }
  var max = A[0];
  A[0] = A[heap_size - 1];
  A.heap_size = A.heap_size - 1;
  A.length = A.length - 1;
  max_heapify(A, 1);
  return max;
}

// 改变某个位置的key值
function heap_increase_key(A, i, key) {
  if (i < 1) {
    throw error();
  }
  A[i - 1] = key;
  while (i > 1 && A[parent(i) - 1] < A[i - 1]) {
    exchange(A, parent(i), i);
    i = parent(i);
  }
}

function max_heap_insert(A, key) {
  A.heap_size = A.heap_size + 1;
  A[A.heap_size - 1] = -Infinity;
  heap_increase_key(A, A.heap_size, key);
}

// 满足O(lgn)的复杂度
function max_heap_delete(A, i) {
  // 当被删除的节点大于heap最后一个节点 只要更新当前的子堆就可以保持整个heap的稳定
  if (A[i - 1] > A[A.heap_size - 1]) {
    A[i - 1] = A[A.heap_size - 1];
    max_heapify(A, i);
  } else {
    // 当前被删去的值小于heap最后一个节点值 其他结构式稳定的 需要把当前的节点状态自底向上更新
    heap_increase_key(A, i, A[A.heap_size - 1]);
  }
  A.length = A.length - 1;
  A.heap_size = A.heap_size - 1;
}

// var arr = [15, 7, 9, 1, 2, 3, 8];
// build_max_heap(arr);
// var max_priority_queue = arr;
// var max = heap_maximum(max_priority_queue);
// var ext_max = heap_extract(max_priority_queue);
// heap_increase_key(max_priority_queue, 6, 10);
// max_heap_insert(arr, 20)
// max_heap_delete(max_priority_queue, 5);
// console.log(max_priority_queue);
