// b树是一个平衡搜索树 与红黑树类似 b树自然推广了二叉树
// 1. 每个节点x有以下属性
//    a. x.n 当前存储在x节点中关键字的个数
//    b. x.n个关键字 x.key1 -> xkey(x.n) 以非降序排列 => x.key1 <= x.key2 <= x.key(x.n)
//    c. x.leaf是布尔值 当x是叶节点的时候为true 为内部节点的时候为false
// 2. 每个节点x内部还含有x.n + 1个指向其孩子的指针 叶节点没有孩子
// 3. 关键字x.key(i)对存储在各个子树中关键字范围加以分割 如果k(i) 为任意一个存储在x.c(i) 为根的子树中的关键字 => k1 <= x.key1 <= k2 <= x.key2 <= x.key(x.n) <= k(x.n + 1)
// 4. 每个叶节点具有相同的深度，(树高和深度不一定的)
// 5. 每个节点包含的关键字有上界和下界 最下度数t>=2
//    a. 除了根节点意外 每个节点必须至少有t-1个关键字 因此节点得孩子就至少有t个 树非空，根节点至少有一个关键字
//    b. 每个节点至多有2t-1个关键字，最多有2t个节点，当节点得关键字恰好等于2t-1时 该节点是满的

// 2-3-4树就是当t等于2的一种情况
// h <= logt((n + 1) / 2)

function b_tree_search(x, k) {
  var i = 0;
  while (i < x.n && k > x.key) {
    i = i + 1;
  }
  if (i < x.n && x.key === key) {
    return {
      x: x[i],
      i,
    };
  } else if (x.leaf) {
    return null;
  } else {
    return b_tree_search(x[i], k);
  }
}

function b_tree_create(T) {
  var x = new allocate_node();
  x.leaf = true;
  x.n = 0;
  T.root = x;
}

// 创建节点
function allocate_node() {
  this.n = null;
  this.key = new Array();
  this.leaf = null;
  this.child = new Array();
}

function b_tree_insert(T, k) {}

function b_tree_split_child() {}
