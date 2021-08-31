/**
 * 数堆
 * 关键字满足二叉搜索树 权重满足堆的性质(这里用最小堆实现)
 * 实现分为无旋转和旋转实现
 */

// 旋转实现
function treap_node(key) {
  this.key = key;
  this.left = null;
  this.right = null;
  this.priority = null;
  this.p = null;
}

function left_rotate(T, x) {
  var y = x.right;

  x.right = y.left;
  if (y.left !== null) {
    y.left.p = x;
  }
  y.p = x.p;

  if (x.p === null) {
    T.root = y;
  } else if (x.p.left === x) {
    x.p.left = y;
  } else {
    x.p.right = y;
  }
  x.p = y;
  y.left = x;
}

function right_rotate(T, x) {
  var y = x.left;

  x.left = y.right;
  if (y.right !== null) {
    y.right.p = x;
  }
  y.p = x.p;

  if (x.p === null) {
    T.root = y;
  } else if (x.p.left === x) {
    x.p.left = y;
  } else {
    x.p.right = y;
  }
  x.p = y;
  y.right = x;
}

// 有问题
function insert(T, x, z) {
  if (x === null) {
    return z;
  } else if (z.key < x.key) {
    x.left = insert(T, x.left, z);
    x.left.p = x;

    if (z.priority < x.priority) {
      right_rotate(T, x);
    }
  } else {
    x.right = insert(T, x.right, z);
    x.right.p = x;

    if (z.priority < x.priority) {
      left_rotate(T, x);
    }
  }
  return x;
}

function treap_insert(T, z) {
  if (T.root === null) {
    T.root = z;
  } else {
    insert(T, T.root, z);
  }
}

function treap_insert_with_key(T, key) {
  // 权重随机数范围设置为1000
  var seed = 1000;
  var node = new treap_node(key);
  node.priority = Math.ceil(Math.random() * seed);
  treap_insert(T, node);
}

// TODO treap delete
function treap_delete(T, z) {
  var y = null;
  while (z) {
    y = z;
    if (z.left === null) {
      z = z.left;
    } else if (z.right === null) {
      z = z.right;
    }
  }
}

function treap_delete_with_key(T, key) {}

// TODO treap 非旋转实现 （有点类似于b树）
function split() {}
function merge() {}
function build() {}

var T = {
  root: null,
};

treap_insert_with_key(T, 50);
treap_insert_with_key(T, 30);
treap_insert_with_key(T, 20);
treap_insert_with_key(T, 40);
treap_insert_with_key(T, 70);
treap_insert_with_key(T, 60);
treap_insert_with_key(T, 80);
console.log(T);
