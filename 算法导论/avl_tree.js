/**
 * avl是一颗高度平衡的二叉搜索树 左子树和右子树高度差最多为1
 * 平衡因子就是用他的左子树的高度减去右子树的高度
 * 当平衡因子是0，1，-1树被认为是平衡的
 * avl节点树 S(h) = S(h - 1) + S(h - 2) + 1
 */

function avl_tree_node(key) {
  this.key = key;
  this.height = 1;
  this.left = null;
  this.right = null;
  this.p = null;
}

function tree_height(x) {
  if (x === null) {
    return 0;
  }
  return x.height;
}

// 左旋
function left_rotate(T, x) {
  var y = x.right;
  x.right = y.left;

  if (y.left !== null) {
    y.left.p = x;
  }

  y.p = x.p;

  // 根节点
  if (x.p === null) {
    T.root = y;
  } else if (x.p.right === x) {
    x.p.right = y;
  } else {
    x.p.left = y;
  }
  x.p = y;
  y.left = x;

  x.height = Math.max(tree_height(x.left), tree_height(x.right)) + 1;
  y.height = Math.max(tree_height(y.left), tree_height(y.right)) + 1;
}

// 右旋
function right_rotate(T, x) {
  var y = x.left;
  x.left = y.right;

  if (y.right !== null) {
    y.left.right = x;
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

  x.height = Math.max(tree_height(x.left), tree_height(x.right)) + 1;
  y.height = Math.max(tree_height(y.left), tree_height(y.right)) + 1;
}

function avl_tree_insert(T, z) {
  var y = null;
  var x = T.root;

  while (x !== null) {
    y = x;

    if (z.key < x.key) {
      x = x.left;
    } else {
      x = x.right;
    }
  }

  if (y !== null) {
    if (z.key < y.key) {
      y.left = z;
    } else {
      y.right = z;
    }
    z.p = y;
  } else {
    T.root = z;
  }
  avl_tree_balance(T, z);
}

function avl_tree_balance(T, z) {
  /**
   * case1
   *      x        y
   *     /        / \
   *    y  =>    z   x
   *   /
   *  z
   *
   * case2
   *
   *   x           y
   *    \         / \
   *     y  =>   x   z
   *      \
   *       z
   *
   * case3
   *
   *    x           x       z
   *   /           /       / \
   *   y   =>     z   =>  y   x
   *    \        /
   *     z      y
   *
   *  case4
   *
   *    x          x             z
   *     \          \           / \
   *      y   =>     z     =>  x   y
   *     /            \
   *    z              y
   */
  var y = z.p;
  while (y) {
    y.height = Math.max(tree_height(y.left), tree_height(y.right)) + 1;
    if (tree_height(y.left) - tree_height(y.right) === 2) {
      if (z.key < y.left.key) {
        // case1
        right_rotate(T, y);
      } else {
        // case3
        left_rotate(T, y.left);
        right_rotate(T, y);
      }
    } else if (tree_height(y.right) - tree_height(y.left) === 2) {
      if (z.key > y.right.key) {
        // case2
        left_rotate(T, y);
      } else {
        // case4
        right_rotate(T, y.right);
        left_rotate(T, y);
      }
    }
    y = y.p;
  }
}

function avl_tree_insert_with_key(T, key) {
  var node = new avl_tree_node(key);
  avl_tree_insert(T, node);
}

function tree_search(x, key) {
  if (x === null || x.key === key) {
    return x;
  }

  if (key < x.key) {
    return tree_search(x.left, key);
  } else {
    return tree_search(x.right, key);
  }
}

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

function tree_minimum(x) {
  if (x.left !== null) {
    return tree_minimum(x.left);
  }
  return x;
}

function avl_tree_delete(T, x) {
  if (x.left === null) {
    transplant(T, x, x.left);
  } else if (x.right === null) {
    transplant(T, x, x.right);
  } else {
    var y = tree_minimum(x.right);
    if (y === x.right) {
      transplant(T, x, x.right);
      y.left = x.left;
      y.left.p = y;
    } else {
      transplant(T, y, y.right);
      transplant(T, x, y);
      x.left.p = y;
      x.right.p = y;
      y.left = x.left;
      y.right = x.right;
    }
  }
}

function avl_tree_delete_with_key(T, key) {
  var x = tree_search(T.root, key);
  avl_tree_delete(T, x);
}

var T = {
  root: null,
};


// TODO 增加单元测试
// avl_tree_insert_with_key(T, 1);
// avl_tree_insert_with_key(T, 15);
// avl_tree_insert_with_key(T, 14);
// avl_tree_insert_with_key(T, 7);
// avl_tree_insert_with_key(T, 2);
// avl_tree_insert_with_key(T, 3);

// console.log(T);


