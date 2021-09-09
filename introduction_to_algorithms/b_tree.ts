// b树是一个平衡搜索树 与红黑树类似 b树自然推广了二叉树
// 1. 每个节点x有以下属性
//    a. x.n 当前存储在x节点中关键字的个数
//    b. x.n个关键字 x.key1 -> xkey(x.n) 以非降序排列 => x.key1 <= x.key2 <= x.key(x.n)
//    c. x.leaf是布尔值 当x是叶节点的时候为true 为内部节点的时候为false
// 2. 每个节点x内部还含有x.n + 1个指向其孩子的指针 叶节点没有孩子
// 3. 关键字x.key(i)对存储在各个子树中关键字范围加以分割 如果k(i) 为任意一个存储在x.c(i) 为根的子树中的关键字 => k1 <= x.key1 <= k2 <= x.key2 <= x.key(x.n) <= k(x.n + 1)
// 4. 每个叶节点具有相同的深度，(树高和深度不一定的)
// 5. 每个节点包含的关键字有上界和下界 最小度数t>=2
//    a. 除了根节点意外 每个节点必须至少有t-1个关键字 因此节点得孩子就至少有t个 树非空，根节点至少有一个关键字
//    b. 每个节点至多有2t-1个关键字，最多有2t个节点，当节点得关键字恰好等于2t-1时 该节点是满的

// 2-3-4树就是当t等于2的一种情况
// h <= logt((n + 1) / 2)

interface b_tree_node {
  n: number; // 关键字个数
  key: number[] | string[]; // 关键字 （非降序存放）
  leaf: boolean; // 是否是叶节点
  child: b_tree_node[];
}

interface b_tree_root {
  root: b_tree_node;
  degree: number;
}

class b_tree_node implements b_tree_node {
  constructor() {
    this.n = null;
    this.key = [];
    this.leaf = null;
    this.child = [];
  }
}

function b_tree_search(x: b_tree_node, key: number | string) {
  let i = 0;

  while (i < x.n && key > x.key[i]) {
    i = i + 1;
  }

  if (i < x.n && key === x.key[i]) {
    return {
      i,
      x,
    };
  } else if (x.leaf) {
    return null;
  } else {
    return b_tree_search(x.child[i], key);
  }
}

function b_tree_create(T: b_tree_root) {
  let node = new b_tree_node();
  node.leaf = true;
  node.n = 0;
  T.root = node;
}

// 分裂满节点
// i为对应x满孩子节点的下标
function b_tree_split_child(T: b_tree_root, x: b_tree_node, i: number) {
  let z = new b_tree_node();
  let y = x.child[i];

  // 新分配的z节点和y节点是通一个深度的所以leaf状态应该一样
  z.leaf = y.leaf;

  // 每个节点至少有t-1个关键字（除了根节点）分解成2块t-1区域,中间的第t个节点上提 树的高度+1
  z.n = T.degree - 1;
  // 所以从y的关键字中分裂出的最大的t-1个
  for (let j = 0; j < T.degree - 1; j++) {
    z.key[j] = y.key[j + T.degree];
  }

  // 假如y不是叶节点的情况,需要将y的孩子节点分配t个给z
  if (!y.leaf) {
    for (let j = 0; j < T.degree; j++) {
      z.child[j] = y.child[j + T.degree];
    }
  }

  // 分配好后y的关键字数量为变为t-1
  y.n = T.degree - 1;

  // 将x孩子从i+1位往右平移，为了将x的child[i]指向z留出位置
  for (let j = x.n; j > i; j--) {
    x.child[j + 1] = x.child[j];
  }

  // y分裂后，x中的孩子节点的指针数量也应该增加1
  x.child[i + 1] = z;

  // 将x的关键字往右移动一位留出一个空位给y中提升上来得关键字（从i+1开始）
  for (let j = x.n; j > i; j--) {
    x.key[j] = x.key[j - 1];
  }

  x.key[i] = y.key[T.degree - 1];
  // 调整x节点关键字的个数
  x.n = x.n + 1;

  // 为了直观一点这边把分裂出去的元素删去
  y.key.length = T.degree - 1;
  if (!y.leaf) {
    // 为了直观一点这边把分裂出去的元素的孩子删除(为了性能可以不做处理)
    y.child.length = T.degree;
  }
}

function b_tree_insert(T: b_tree_root, k: number | string) {
  let r = T.root;
  // 这个算法和可视化网站的算法不一样（可视化网站是插入后达到最大度直接分裂）
  // 节点的数量达到了最大度的时候要分解
  if (r.n === 2 * T.degree - 1) {
    let s = new b_tree_node();
    T.root = s;
    s.leaf = false;
    s.n = 0;
    s.child[0] = r;
    b_tree_split_child(T, s, 0);
    b_tree_insert_nonfull(T, s, k);
  } else {
    b_tree_insert_nonfull(T, r, k);
  }
}

function b_tree_insert_nonfull(
  T: b_tree_root,
  x: b_tree_node,
  k: number | string
) {
  let i = x.n;
  if (x.leaf) {
    while (i > 0 && k < x.key[i - 1]) {
      x.key[i] = x.key[i - 1];
      i = i - 1;
    }
    x.key[i] = k;
    x.n = x.n + 1;
  } else {
    // 找到key < x.keyi && key > x.keyj的位置
    while (i > 0 && k < x.key[i - 1]) {
      i = i - 1;
    }
    // 插入的位置
    if (x.child[i].n === 2 * T.degree - 1) {
      b_tree_split_child(T, x, i);
      //
      if (k > x.key[i]) {
        i = i + 1;
      }
    }
    b_tree_insert_nonfull(T, x.child[i], k);
  }
}

/**
 * btree的删除分三个主要情况 （该算法的实现是保证每个节点度至少有t关键字）
 * 1.关键字k在x中，并且x是叶节点，直接删除k
 * 2.关键字k在x中, 并且x是内部节点
 * a. 如果x中在前于k的节点y至少有t个关键字，则找出k在以y为根的子树的前驱k’，递归删除k’，并且在x中用k代替k’
 */

function b_tree_presuccessor(x: b_tree_node) {
  // x.child[0]
}
function b_tree_successor() {}
function b_tree_delete(x: b_tree_node, key: number | string) {
  // 情况1 x是叶节点
  if (x.leaf === true) {
    let i = 0;
    while (i < x.n && key > x.key[i]) {
      i = i + 1;
    }

    if (x.key[i] === key) {
      for (let j = i; j < x.n; j++) {
        x.key[j] = x.key[j + 1];
      }
      x.key.length = x.key.length - 1;
    }
  } else {
    
  }
}

function b_tree_delete_with_key(T: b_tree_root, key: number | string) {
  let { x } = b_tree_search(T.root, key);
  b_tree_delete(x, key);
}

const T: b_tree_root = {
  root: null,
  // 最小度 最大度 = 2 * 最小度 - 1
  degree: 3,
};

b_tree_create(T);
const s = [
  "F",
  "S",
  "Q",
  "K",
  "C",
  "L",
  "H",
  "T",
  "V",
  "W",
  "M",
  "R",
  "N",
  "P",
  "A",
  "B",
  "X",
  "Y",
  "D",
  "Z",
  "E",
];

for (let i of s) {
  b_tree_insert(T, i);
}

// b_tree_search(T.root, "D");
// b_tree_delete_with_key(T, "E");

export {};
