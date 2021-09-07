// b树是一个平衡搜索树 与红黑树类似 b树自然推广了二叉树
// 1. 每个节点x有以下属性
//    a. x.n 当前存储在x节点中关键字的个数
//    b. x.n个关键字 x.key1 -> xkey(x.n) 以非降序排列 => x.key1 <= x.key2 <= x.key(x.n)
//    c. x.leaf是布尔值 当x是叶节点的时候为true 为内部节点的时候为false
// 2. 每个节点x内部还含有x.n + 1个指向其孩子的指针 叶节点没有孩子
// 3. 关键字x.key(i)对存储在各个子树中关键字范围加以分割 如果k(i) 为任意一个存储在x.c(i) 为根的子树中的关键字 => k1 <= x.key1 <= k2 <= x.key2 <= x.key(x.n) <= k(x.n + 1)
// 4. 每个叶节点具有相同的深度，(树高和深度不一定的)
// 5. 每个节点包含的关键字有上界和下界 最小ß度数t>=2
//    a. 除了根节点意外 每个节点必须至少有t-1个关键字 因此节点得孩子就至少有t个 树非空，根节点至少有一个关键字
//    b. 每个节点至多有2t-1个关键字，最多有2t个节点，当节点得关键字恰好等于2t-1时 该节点是满的

// 2-3-4树就是当t等于2的一种情况
// h <= logt((n + 1) / 2)

interface b_tree_node {
  n: number; // 关键字个数
  key: number[]; // 关键字 （非降序存放）
  leaf: boolean; // 是否是叶节点
  child: b_tree_node[];
}

class b_tree_node implements b_tree_node {
  n: number;
  key: number[];
  leaf: boolean;
  child: b_tree_node[];
}

function b_tree_search(x: b_tree_node, key: number) {
  let i = 1;

  while (i <= x.n && key > x.key[i]) {
    i = i + 1;
  }

  if (i <= x.n && key === x.key[i]) {
    return {
      i,
    };
  } else if (x.leaf) {
    return null;
  } else {
    return b_tree_search(x.child[i - 1], key);
  }
}

interface b_tree_root {
  root: b_tree_node;
}

function b_tree_create(T: b_tree_root) {
  let node = new b_tree_node();
  node.leaf = true;
  node.n = 0;
  T.root = node;
}

// 分裂满节点
