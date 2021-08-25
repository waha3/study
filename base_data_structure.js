// 栈
function stack(n) {
  this.arr = new Array(n);
  this.stack_size = n;
  this.top = 0;
}

function stack_empty(S) {
  if (S.top === 0) return true;
  return false;
}

function push(S, x) {
  if (S.stack_size === S.top) {
    throw Error("overflow");
  } else {
    S.top = S.top + 1;
    S.arr[S.top] = x;
  }
}

function pop(S) {
  if (stack_empty(S)) {
    throw Error("underflow");
  } else {
    S.top = S.top - 1;
    return S.arr[S.stop + 1];
  }
}

// var s = new stack(2);
// stack_empty(s);
// push(s, 1);
// pop(s);
// console.log(s);

// 队列
function queue(n) {
  this.arr = new Array(n);
  this.size = n;
  this.head = 0;
  this.tail = 0;
}

function enqueue(Q, x) {
  Q.arr[Q.tail] = x;
  if (Q.tail === Q.size) {
    Q.tail = 1;
  } else {
    Q.tail = Q.tail + 1;
  }
}

function dequeue(Q) {
  x = Q.arr[Q.head];
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
}

function node(key) {
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

// 对象

// 对象的多数组表示
// 三个数组 分别存key prev next

// 对象的单数组表示
// 用数组的索引作为指针 在此基础上加上偏移量 来表示prev next
function allocate_object() {}
function free_object(x) {}

// 有根树

// 二叉树
function treeNode(left, right, val) {
  this.left = left;
  this.right = right;
  this.val = val;
}

// TODO
// 前序遍历
// 中序遍历
// 后序遍历






