// TODO 斐波拉契堆

interface fib_heap_node {
  key: number | string;
  p: fib_heap_node;
  child: fib_heap_node;
  left: fib_heap_node;
  right: fib_heap_node;
  degree: number; // 孩子链表中孩子的数目
  mark: boolean; // x上次成为孩子节点后，是否失去过孩子节点
}

interface fib_heap_root {
  n: number;
  min: double_linked_list;
}

interface double_linked_list {
  head: fib_heap_node;
  tail: fib_heap_node;
  insert(x: fib_heap_node): void;
}

class fib_heap_double_linked_list implements double_linked_list {
  head = null;
  tail = null;

  insert(x: fib_heap_node) {
    if (this.head === null) {
      x.left = x.right = x;
      this.head = x;
      this.tail = x;
    } else {
      this.tail.left = x;
      this.tail.right = x;
      x.p = this.tail;
    }
  }
}

class fib_heap_node implements fib_heap_node {
  constructor(key: number | string) {
    this.p = null;
    this.child = null;
    this.left = null;
    this.right = null;
    this.degree = 0;
    this.mark = false;
    this.key = key;
  }
}

function make_fib_heap(): fib_heap_root {
  return {
    n: 0,
    min: null,
  };
}

function fib_heap_insert(H: fib_heap_root, x: fib_heap_node) {
  x.degree = 0;
  x.p = null;
  x.child = null;
  x.mark = false;
  if (H.min === null) {
    // create root list
    let list = new fib_heap_double_linked_list();
    list.insert(x);
    H.min = list;
  } else {
    H.min.insert(x);
  }
}
// function minimum(H) {}
// function extract_min(H) {}
// function union(H1, H2) {}
// function decrease_key(H, x, k) {}
// function delete(H, x) {}

let H = make_fib_heap();
fib_heap_insert(H, new fib_heap_node("a"));
