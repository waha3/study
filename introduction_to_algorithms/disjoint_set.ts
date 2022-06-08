// TODO 并查集

// 不相交集合的操作 用一个代表来表示某个集合（不关心哪个成员被用来代表）

// interface disjoint_set {
//   make_set: (x) => void
//   union: (x, y) => void
//   find_set: (x) => void
// }

interface link_list_node {
  key: number | string;
  next: null | link_list_node;
}

interface link_list {
  head: null | link_list_node;
  tail: null | link_list_node;
  insert: (x: link_list_node) => link_list;
}

class _node implements link_list_node {
  key: number | string;
  next: link_list_node | null;

  constructor(key: number | string) {
    this.key = key;
    this.next = null;
  }
}

class _link_list implements link_list {
  head: link_list_node | null;
  tail: link_list_node | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  insert(x: link_list_node) {
    if (this.head === null && this.tail === null) {
      this.head = x;
      this.tail = x;
    } else {
      this.tail.next = x;
      this.tail = this.tail.next;
    }
    return this;
  }
}

// 链表表示
// class disjoint_set_list {
//   make_set(x: number | string) {
//     let node = new link_list_node(x);
//     let L = new link_list();
//     L.insert(node);
//     node.set = L;
//     return L;
//   }

//   union(x: number | string, y: number | string) {}

//   find_set(x: number | string) {}
// }

// 有跟树表示

// 优化方式：
// 按秩合并 将节点数目小的森林指向大的森林
// 路径压缩 使查找的路径直接指向跟节点

// class disjoint_set_forest_node {
//   p: disjoint_set_forest_node;
//   rank: number;
//   key: number | string;
//   constructor(key: number | string) {
//     this.p = null;
//     this.rank = null;
//     this.key = key;
//   }
// }
// class disjoint_set_forest {
//   make_set(x: disjoint_set_forest_node) {
//     x.p = x;
//     x.rank = 0;
//   }

//   union(x: disjoint_set_forest_node, y: disjoint_set_forest_node) {
//     this.link(this.find_set(x), this.find_set(y));
//   }

//   link(x: disjoint_set_forest_node, y: disjoint_set_forest_node) {
//     if (x.rank > y.rank) {
//       y.p = x;
//     } else {
//       x.p = y;

//       if (x.rank === y.rank) {
//         y.rank = y.rank + 1;
//       }
//     }
//   }

//   find_set(x: disjoint_set_forest_node): disjoint_set_forest_node {
//     while (x.p !== x) {
//       x = x.p;
//     }

//     return x;
//   }
// }
