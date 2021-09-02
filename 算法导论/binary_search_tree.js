/**
 * 二叉搜索树
 *
 * 1. 若它的左子树不空，则左子树上所有结点的值均小于等于它的根结点的值；
 * 2. 若它的右子树不空，则右子树上所有结点的值均大于等于它的根结点的值；
 * 3. 它的左、右子树也分别为二叉查找树
 */

// 中序遍历
// 输出的子树根结点的值在其左子树的值和右子树的值之间
// 先序遍历
// 输出的子树根结点的值在其左子树的值和右子树的值之前
// 后序遍历
// 输出的子树根结点的值在其左子树的值和右子树的值后

function inorder_tree_walk(x) {
  if (x !== null) {
    inorder_tree_walk(x.left);
    console.log(x.key);
    inorder_tree_walk(x.right);
  }
}

function preorder_tree_walk(x) {
  if (x !== null) {
    console.log(x.key);
    preorder_tree_walk(x.left);
    preorder_tree_walk(x.right);
  }
}

function postorder_tree_walk(x) {
  if (x !== null) {
    postorder_tree_walk(x.left);
    postorder_tree_walk(x.right);
    console.log(x.key);
  }
}

// 层序遍历 (广度遍历)
function levelorder_tree_walk(x) {
  var queue = [];
  queue.unshift(x);

  while (queue.length) {
    var first = queue.pop();
    console.log(first.key);

    if (first.left) {
      queue.unshift(first.left);
    }

    if (first.right) {
      queue.unshift(first.right);
    }
  }
}

// 栈辅助的迭代法
function inorder_tree_walk_interation(x) {
  var stack = [];
  var current = x;

  while (current || stack.length) {
    if (current) {
      stack.push(current);
      current = current.left;
    } else {
      current = stack.pop();
      console.log(current.key);
      current = current.right;
    }
  }
}

// 双指针法
function inorder_tree_walk_double_pointer(x) {
  var stack = [];
  var current = x;
  var done = 0;

  while (!done) {
    if (current) {
      stack.push(current);
      current = current.left;
    } else {
      if (stack.length) {
        current = stack.pop();
        console.log(current.key);
        current = current.right;
      } else {
        done = 1;
      }
    }
  }
}

// 先序遍历的迭代
function preorder_tree_walk_interation(x) {
  var stack = [];
  var current = x;
  var done = 0;

  while (!done) {
    if (current) {
      stack.push(current);
      current = current.left;
    } else {
      if (stack.length) {
        current = stack.pop();
        current = current.right;
      } else {
        done = 1;
      }
    }
  }
}

// 后序遍历的迭代(双栈)
function postorder_tree_walk_interation_double_stack(x) {
  var stack = [];
  var current = x;
  var done = 0;
  var res = [];

  while (!done) {
    if (current) {
      res.push(current.key);
      stack.push(current);
      current = current.right;
    } else {
      if (stack.length) {
        current = stack.pop();
        current = current.left;
      } else {
        done = 1;
      }
    }
  }

  while (res.length) {
    var key = res.pop();
    console.log(key);
  }
}

// 后序遍历的迭代(加个指针)
function postorder_tree_walk_interation(x) {
  var stack = [];
  var current = x;
  var done = 0;
  var pre;

  while (!done) {
    if (current) {
      stack.push(current);
      current = current.left;
    } else {
      if (stack.length) {
        current = stack.pop();
        if (current.right === null || current.right === pre) {
          console.log(current.key);
          pre = current;
          current = null;
        } else {
          stack.push(current);
          current = current.right;
        }
      } else {
        done = 1;
      }
    }
  }
}

// 二叉搜索树

// 查找
function tree_search(x, k) {
  if (x === null || k === x.key) {
    return x;
  }

  if (k < x.key) {
    return tree_search(x.left, k);
  } else {
    return tree_search(x.right, k);
  }
}

// 查找（迭代）
function iterative_tree_search(x, k) {
  while (x !== null && x !== x.key) {
    if (k < x.key) {
      x = x.left;
    } else {
      x = x.right;
    }
  }
  return x;
}

function tree_minimum(x) {
  while (x.left !== null) {
    x = x.left;
  }
  return x;
}

function tree_minimum_recursive(x) {
  if (x.left !== null) {
    return tree_minimum_recursive(x.left);
  }
  return x;
}

function tree_maximum(x) {
  while (x.right !== null) {
    x = x.right;
  }
  return x;
}

function tree_maximum_recursive(x) {
  if (x.right !== null) {
    return tree_minimum_recursive(x.right);
  }
  return x;
}

// 后继
// 一个节点得后继（所有关键字互不相同）就是大于 x.key的最小关键字节点
function tree_successor(x) {
  if (x.right !== null) {
    return tree_minimum(x.right);
  }
  // 父节点
  // 找到双亲左节点
  var y = x.p;
  while (y !== null && x === y.right) {
    x = y;
    y = y.p;
  }
  return y;
}

// 前驱
function tree_presuccessor(x) {
  if (x.left !== null) {
    return tree_maximum(x.left);
  }
  var y = x.p;
  while (y !== null || x === y.left) {
    x = y;
    y = y.p;
  }
  return y;
}

function tree_node(key) {
  this.left = null;
  this.right = null;
  this.p = null;
  this.key = key;
}

// insert key not node
function tree_insert(T, key) {
  var y = null;
  var x = T.root;

  while (x !== null) {
    y = x;
    if (key < x.key) {
      x = x.left;
    } else {
      x = x.right;
    }
  }

  var node = new tree_node(key);
  node.p = y;

  if (y !== null) {
    if (key < y.key) {
      y.left = node;
    } else {
      y.right = node;
    }
  } else {
    T.root = node;
  }
}

// insert recursive
function tree_insert_recursive(T, key) {
  if (T.root == null) {
    T.root = new tree_node(key);
  } else {
    insert(T.root, key);
  }
}

function insert(x, key) {
  if (x === null) {
    return new tree_node(key);
  } else if (key < x.key) {
    x.left = insert(x.left, key);
    x.left.p = x;
  } else {
    x.right = insert(x.right, key);
    x.right.p = x;
  }
  return x;
}

// 删除节点
// 删除bst节点有3中情况
/**
 *  1. z节点没有左孩子 用他的右孩子来替换z，其中r可以null
 *  2. z节点有右孩子 但是没有左孩子 用左孩子替换z
 *  3. z既有左孩子又有有孩子
 *   (a) z的左节点是l 右节点y 也是其后继 y的右节点是x 用y替换z 修改l变成y的左节点 x仍然是y子节点
 *   (b) z的左节点是l 右节点r z的后继y不等于r 位于以r为根的子树中用y的右孩子x来代替y 并且把y设置为r的双亲
 */
function tree_remove(T, z) {
  if (z.left === null) {
    transplant(T, z, z.right);
  } else if (z.right === null) {
    transplant(T, z, z.left);
  } else {
    var y = tree_minimum(z.right);
    // z的后继y 是不是其右节点
    if (y.p !== z) {
      transplant(T, y, y.right);
      y.right = z.right;
      y.right.p = z;
    }
    transplant(T, z, y);
    y.left = z.left;
    y.left.p = y;
  }
}

// 删除节点得辅助过程
function transplant(T, u, v) {
  if (u.p === null) {
    T.root = v;
  } else if (u.p.left === u) {
    u.p.left = v;
  } else {
    u.p.right = v;
  }

  if (v !== null) {
    v.p = u.p;
  }
}

var T = {
  root: null,
};

// tree_insert(T, 3);
// tree_insert(T, 2);
// tree_insert(T, 1);
// tree_insert(T, 10);
// tree_insert(T, 14);
// tree_insert(T, 9);
// tree_insert(T, 8);
// tree_insert(T, 20);
// tree_insert(T, 11)
// tree_insert(T, 13);
// tree_insert_recursive(T, 3);
// tree_insert_recursive(T, 2);
// tree_insert_recursive(T, 1);
// tree_insert_recursive(T, 10);
// tree_insert_recursive(T, 14);
// var node = tree_search(T.root, 10);
// tree_remove(T, node);
// console.log(T);
