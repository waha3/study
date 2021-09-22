/**
 * 红黑树
 * 1.每个节点是红色或者黑色
 * 2.根节点是黑色
 * 3.叶节点是黑色 (使用哨兵节点来代替null 为了简化一些边界条件的判断)
 * 4.如果一个节点是红色，则他的两个子节点是黑色
 * 5.对于每个节点，该节点到其所有后代的叶节点的简单路径上，均包含相同数目的黑色节点
 *
 * 黑高: 对于一个节点（不含本节点）到任意的叶节点的简单路径上所有黑色节点得个数(不包含nil节点)
 */

// 旋转后的操作还保持了二叉树搜索树的性质
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
      // 颜色的直接修改需要保证平衡不能改变性质5
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

function tree_minimum(T, x) {
  while (x.left !== T.nil) {
    x = x.left;
  }
  return x;
}

// 节点得删除
function rb_delete(T, z) {
  // x是表示当z节点被删除后去替换之前y位置的节点
  var x;
  // y节点指向的直接被删除的节点或者被移动的节点（当z有两个子节点的时候）这个时候直接删掉
  // y节点被删除可能会影响到红黑树的性质
  var y = z;
  y.original_color = y.color;

  if (z.left === T.nil) {
    x = z.right;
    rb_transplant(T, z, z.right);
  } else if (z.right === T.nil) {
    x = z.left;
    rb_transplant(T, z, z.left);
  } else {
    var y = tree_minimum(z.right);
    y.original_color = y.color;
    x = y.right;

    // 当z的后继y是z的右节点是直接将y替换z这里面只需要改变x (y.right)的指针指向y 其他的操作后面会执行
    if (y.p === z) {
      // 将x.p设置为y是得x.p继续指向y在y后面的转换后
      x.p = y;
    } else {
      // 当z的后继y不直接是z的右节点时 需要进行两波操作 第一步是先替换y和y的右节点 在交换z和y
      rb_transplant(T, y, y.right);
      y.right = z.right;
      y.right.p = y;
    }
    rb_transplant(T, z, y);
    y.left = z.left;
    y.left.p = y;
    // 删除掉z节点要保持当前简单路径红黑树的性质不变
    y.color = z.color;
  }

  /**
   * 删除或者移动的是一个黑色节点 性质2性质5可能会被破坏
   * 所以这边要传入x节点 当y节点已经被x替换后
   *
   * 当y是黑色被删除时y节点所在任意一个路径必然会被减1，这样就违背了性质5
   * 这时候会将删去y的黑色给x这样x所处的节点颜色就会+1或者+2 当x的颜色是红色（红黑 +1）黑色的时候（黑黑 +2）
   */
  if (y.original_color === "black") {
    rb_delete_fixup(T, x);
  }
}

// ps. x(包含了nil节点)是一个双色节点带了一个额外的黑色（继承自被删除的y节点）
// fixup本质上就是消去删除一个黑色节点对周围节点得影响
// TODO 对于消去双黑的流程有点疑问
function rb_delete_fixup(T, x) {
  while (x !== T.root && x.color === "black") {
    if (x === x.p.left) {
      // x的兄弟节点
      var w = x.p.right;
      if (w.color === "red") {
        /**
         * case1
         * x的兄弟节点w是红色
         * 然后再以w的父节点旋转 这样就可以转换成2，3或者4继续进行处理
         */
        w.color = "black";
        x.p.color = "red";
        left_rotate(T, x.p);
        w = x.p.right;
      }

      /**
       * case2
       * 当x节点得是黑色，兄弟节点有两个孩子都是黑色的时候（ps. nil节点也是其子节点）
       */
      if (w.left.color === "black" && w.right.color === "black") {
        // 所以从x和w上去掉一重黑色
        w.color = "red";
        // x的额外的黑色往上沿升（主要目的就是把删掉黑色的副作用提升到区域的根节点上）这样就给w和x原来去掉的黑色右补了回来
        x = x.p;
      } else {
        /**
         * case3
         * x的兄弟节点是黑色的，w的左孩子是红色，右孩子是黑色的
         * 将w的左孩子处理变成红色 自己变成黑色然后再右旋保持性质不变
         * 这样就可以转换成case4进行处理
         */
        if (w.left.color === "red" && w.right.color === "black") {
          w.left.color === "black";
          w.color = "red";
          right_rotate(T, w);
          w = x.p.right;
        }

        /**
         * case4
         * x的兄弟节点w是黑色他的右孩子是红色时
         * 消除x多余的黑色
         */
        if (w.right.color === "red") {
          w.color = x.p.color;
          x.p.color = "black";
          // 保持性质5不变
          w.right.color = "black";
          left_rotate(T, x.p);
          // 终止循环条件
          x = T.root;
        }
      }
    } else {
      // case1
      var w = x.p.left;
      if (w.color === "red") {
        w.color = "black";
        x.p.color = "red";
        right_rotate(T, x.p);
        w = x.p.left;
      }

      // case2
      if (w.left.color === "black" && w.right.color === "black") {
        w.color = "red";
        x = x.p;
      } else {
        // case3
        if (w.left.color === "black" && w.right.color === "red") {
          w.right.color = "black";
          w.color = "red";
          left_rotate(T, w);
        }

        // case 4
        if (w.left.color === "red") {
          x.p.color = "black";
          w.color = "red";
          w.left.color = "black";
          right_rotate(T, x.p);
          x = T.root;
        }
      }
    }
  }

  /**
   * 1.当x的节点颜色红色（x是红黑节点）将x变成（单个）黑色
   * 2.x指向根节点的时候 简单移除额外的颜色
   */
  x.color = "black";
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

function rb_delete_with_key(T, key) {
  var node = tree_search(T.root, key);
  rb_delete(T, node);
}

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

// TODO 增加单元测试
// rb_insert_with_key(T, -12);
// rb_insert_with_key(T, 8);
// rb_insert_with_key(T, -8);
// rb_insert_with_key(T, 15);
// rb_insert_with_key(T, 4);
// rb_insert_with_key(T, 12);
// rb_insert_with_key(T, 10);
// rb_insert_with_key(T, 9);
// rb_insert_with_key(T, 11);

// rb_delete_with_key(T, 15);
// rb_delete_with_key(T, -12)
// rb_delete_with_key(T, 9);
// console.log(T);
