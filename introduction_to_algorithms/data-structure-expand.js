/**
 * 数据结构的扩展
 *
 * 1. 选择一种基础的数据结构
 * 2. 确定基础数据结构要维护的附加信息
 * 3. 检验基础数据结构的基本修改操作能否维护信息
 * 4. 设计一个新的操作
 */

// 动态顺序统计
// 这里用treap树来代替书中的红黑树（比较好实现）

var nil = {
  priority: -1,
  size: 0,
};

var T = {
  root: nil,
  nil,
};

function treap_node(key) {
  this.key = key;
  this.priority = null;
  this.left = null;
  this.right = null;
  this.p = null;
}

function left_rotate(T, x) {}

function right_rotate(T, x) {}

function treap_insert(T, x) {
  if (T.root === null) {
    T.root = x;
  } else {
    insert(T.root, x);
  }
}

// 查找给定秩的元素（秩就是元素在线性序列中的位置）
function os_select(x, i) {
  var rank = x.left.size + 1;
  if (i === rank) {
    return x;
  } else if (i < rank) {
    return os_select(x.left, i);
  } else {
    return os_select(x.right, i - r);
  }
}

// 非递归版本
function os_select_iteration(x, i) {
  var rank = x.left.size + 1;

  while (x !== null) {
    if (i < rank) {
      x = x.left;
    } else if (i > rank) {
      x = x.right;
      i = i - r;
    } else {
      return x;
    }
  }
}

// 确定一个元素的秩
function os_rank(T, x) {
  var r = x.left.size + 1;
  var y = x;

  while (y !== T.root) {
    if (y === y.p.right) {
      r = r + y.p.left.size + 1;
    }
    y = y.p;
  }
  return r;
}

function os_rank_recursive(T, x) {
  if (T.root === x) {
    return x.left.size + 1;
  }
  return rank(x);
}

function rank(x, r) {
  if (x === x.p.right) {
    return r + x.p.left.size + 1;
  } else {
    rank(x.p, r);
  }
}

// TODO 区间树
function interval_tree_node() {
  this.int = {
    low: null,
    high: null,
  };
  this.max = null;
}

function interval_tree_insert(T, x) {}

// 区间是否重合
function interval_tree_node_is_overlap(x, y) {
  if (x.low >= y.low && y.low <= x.high) {
    return true;
  } else if (y.low >= x.low && x.low <= y.high) {
    return true;
  } else {
    return false;
  }
}

// 返回一个指向区间树T中的元素x，使得x.int与i重合
function interval_tree_search(T, i) {
  var x = T.root;
  while (x !== T.nil && !interval_tree_node_is_overlap(x, i)) {
    if (x.left !== T.nil && x.left.max >= i.high) {
      x = x.left;
    } else {
      x = x.right;
    }
  }
  return x;
}

function interval_tree_delete(T, x) {}
