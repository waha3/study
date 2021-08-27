/**
 * 红黑树
 * 1.每个节点是红色或者黑色
 * 2.根节点是黑色
 * 3.叶节点是黑色 (使用哨兵节点来代替null 为了简化一些边界条件的判断)
 * 4.如果一个节点是红色，则他的两个子节点是黑色
 * 5.对于每个节点，该节点到其所有后代的叶节点的简单路径上，均包含相同数目的黑色节点
 * 黑高: 对于一个节点（不含本节点）到任意的叶节点的简单路径上所有黑色节点得个数
 */

// 左旋
function left_rotate(T, x) {
  // set y
  var y = x.right;
  // turn y left into x right
  x.right = y.left;
  if (y.left !== T.nil) {
    y.left.p = x;
  }
  // link x parent to y
  y.p = x.p;
  if (x.p === T.nil) {
    T.root = y;
  } else if (x.p.left === x) {
    x.p.left = y;
  } else {
    x.p.right = y;
  }
  // put x on y left
  y.left = x;
  x.p = y;
}

// 右旋转
function right_rotate(T, x) {
  var y = x.left;
  x.left = y.right;
  if (y.right !== T.nil) {
    y.right.p = x;
  }
  y.p = x.p;
  if (x.p === T.nil) {
    T.root = y;
  } else if (x.p.left === x) {
    x.p.left = y;
  } else {
    x.p.right = y;
  }
  y.right = x;
  x.p = y;
}

// 红黑树树的插入
// 默认插入一个红色节点
function rb_insert(T, z) {
  var y = T.nil;
  var x = T.root;

  while (x !== T.nil) {
    y = x;

    if (z.key < x.key) {
      x = x.left;
    } else {
      x = x.right;
    }
  }
  z.p = y;

  if (y === T.nil) {
    T.root = z;
  } else if (z.key < y.key) {
    y.left = z;
  } else {
    y.right = z;
  }

  // 连接哨兵节点并着色
  z.left = T.nil;
  z.right = T.nil;
  z.color = "red";
  rb_insert_fixup(T, z);
}

// 重新着色
function rb_insert_fixup(T, z) {
  // 保持性质4的成立
  // 循环的终止条件就是父节点变成黑色
  while (z.p.color === "red") {
    // 判断父节点的在祖先节点的方向
    if (z.p.p.left === z.p) {
      var y = z.p.p.right;
      // z的叔节点是红色
      // 需要将父节点和叔节点都变成黑色然后为了保持性质5需要将父节点的父节点变成红色 然后再以当前节点迭代
      // case 1
      if (y.color === "red") {
        // 重新作色
        z.p.color = "black";
        y.color = "black";
        z.p.p.color = "red";
        z = z.p.p;
        // case 2
        // z的叔节点是黑色的或者z是一个右孩子
      } else {
        // case2 和 case3 状态不是相互独立的
        if (z.p.right === z) {
          // z往上移一层
          z = z.p;
          // 左旋将z往下移动一层
          left_rotate(T, z);
        }

        // case 3
        // z的叔节点是黑色的且z是一个左孩子
        z.p.color = "black";
        z.p.p.color = "red";
        right_rotate(T, z.p.p);
      }
    } else {
      // 右节点上的
      // z的叔节点
      var y = z.p.p.left;
      if (y.color === "red") {
        // 父亲节点和叔节点变黑 父亲父亲节点变红 保证性质5不变
        z.p.color = "black";
        y.color = "black";
        z.p.p.color = "red";
        // z节点往上前进2层继续迭代
        z = z.p.p;
      } else {
        if (z.p.left === z) {
          // z往上走一层 为了旋转
          z = z.p;
          right_rotate(T, z);
        }
        z.p.color = "black";
        z.p.p.color = "red";
        left_rotate(T, z.p.p);
      }
    }
  }
  // 保持性质2成立
  T.root.color = "black";
}

function rb_insert_with_key(T, key) {
  var node = new rb_tree_node(key);
  rb_insert(T, node);
}

// 节点得删除辅助过程
function rb_transplant(T, u, v) {
  if (u.p === T.nil) {
    T.root = v;
  } else if (u.p.left === u) {
    u.p.left = v;
  } else {
    u.p.right = v;
  }
  v.p = u.p;
}

// 节点得删除
function rb_delete(T, z) {

}

function rb_delete_fixup(T,z) {}

function rb_tree_node(key) {
  this.color = null;
  this.left = null;
  this.right = null;
  this.p = null;
  this.key = key;
}

var nil = {
  color: "black",
};

var T = {
  root: nil,
  nil,
};

// rb_insert_with_key(T, 41);
// rb_insert_with_key(T, 38);
// rb_insert_with_key(T, 31);
// rb_insert_with_key(T, 12);
// rb_insert_with_key(T, 19);
// rb_insert_with_key(T, 8);
// rb_insert_with_key(T, 50);
// rb_insert_with_key(T, 45);
// console.log(T);
