// 栈
function stack(n: number) {
  this.arr = new Array(n);
  this.stack_size = n;
  this.top = 0;
}

interface stack {
  top: number;
  stack_size: number;
  arr: any[];
}

function stack_empty(S: stack) {
  if (S.top === 0) return true;
  return false;
}

function push(S: stack, x: any) {
  if (S.stack_size === S.top) {
    throw Error("overflow");
  } else {
    S.top = S.top + 1;
    S.arr[S.top] = x;
  }
}

function pop(S: stack) {
  if (stack_empty(S)) {
    throw Error("underflow");
  } else {
    S.top = S.top - 1;
    return S.arr[S.top + 1];
  }
}

// var s = new stack(2);
// stack_empty(s);
// push(s, 1);
// pop(s);
// console.log(s);

interface queue {
  arr: any[];
  size: number;
  head: number;
  tail: number;
}

// 队列
function queue(n: number) {
  this.arr = new Array(n);
  this.size = n;
  this.head = 0;
  this.tail = 0;
}

function enqueue(Q: queue, x: any) {
  Q.arr[Q.tail] = x;
  if (Q.tail === Q.size) {
    Q.tail = 1;
  } else {
    Q.tail = Q.tail + 1;
  }
}

function dequeue(Q: queue) {
  let x = Q.arr[Q.head];
  if (Q.head === Q.size) {
    Q.head = 0;
  } else {
    Q.head = Q.head + 1;
  }
  return x;
}

// 双端队列

// 链表

function double_linked_list() {
  this.head = null;
  this.tail = null;
}

function node(key: number | string) {
  this.key = key;
  this.prev = null;
  this.next = null;
}

function list_search(L, k) {
  var x = L.head;
  while (L.tail !== null && x.key !== k) {
    x = x.next;
  }
  return x;
}

function list_insert(L, x) {
  x.next = L.head;
  if (L.head !== null) {
    L.head.prev = x;
  }
  L.head = x;
  x.prev = null;
}

function list_delete(L, x) {
  if (x.prev !== null) {
    x.prev.next = x.next;
  } else {
    L.head = x.next;
  }

  if (x.next !== null) {
    x.next.prev = x.prev;
  }
}

// var l = new double_linked_list();
// var x = new node(10);
// list_insert(l, x);
// console.log(l);

// 指针和对象的实现

// 对象的多数组表示
// 三个数组 分别存key prev next
class object_struct {
  prev: number[];
  next: number[];
  key: number[];

  constructor(n: number) {
    this.prev = new Array(n);
    this.next = new Array(n);
    this.key = new Array(n);
  }

  get(index: number) {
    return {
      key: this.key[index],
      next: this.next[index],
      prev: this.prev[index],
    };
  }
}

// 计算机内存的字往往从0到M-1进行编码，许多编程语言中，一个对象是占据了一整块连续的内存，指针仅仅是第一个该对象所在的存储单元的一个地址，要访问其他存储单元需要加上偏移地址
// 对象的单数组表示
// 用数组的索引作为指针 在此基础上加上偏移量 来表示prev next
class object_struct_singal_arr {
  key: number[];
  next_offset: 2;
  prev_offset: 1;
  next(x: number) {
    return this.key[x] + this.next_offset;
  }

  prev(x: number) {
    return this.key[x] + this.prev_offset;
  }
}

// 对象的分配与释放
class free_list {
  next: free_list;
  inert() {}
}

function allocate_object() {
  let free = new free_list();
  if (free === null) {
    throw "out space";
  } else {
    let x = free;
    free = x.next;
    return x;
  }
}

function free_object(x: free_list) {
  let free = new free_list();
  x.next = free;
  free = x;
}

// 有根树

// 二叉树
interface binary_tree {
  left: binary_tree;
  right: binary_tree;
  val: any;
}

function treeNode(left: binary_tree, right: binary_tree, val: any) {
  this.left = left;
  this.right = right;
  this.val = val;
}
